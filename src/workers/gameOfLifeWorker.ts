import { Matrix, WorkerStatuses, GameWorkerData } from "@/types/types";
import gameOfLifeIteration from "@/utils/gameOfLife";
import isEqual from "lodash-es/isEqual";

let intervalId: NodeJS.Timeout;
let matrix: Matrix;

self.onmessage = (event: MessageEvent<GameWorkerData>) => {
    clearInterval(intervalId);
    const { status, data } = event.data;
    if(status === WorkerStatuses.Started) {
        matrix = data;
        intervalId = setInterval(()=> {
            const result = gameOfLifeIteration(matrix);
            if(!isEqual(matrix, result)) {
                matrix = result;
                postMessage({ data: result, status });
            } else {
                // if no changes then stop
                clearInterval(intervalId);
                postMessage({ data: result, status: WorkerStatuses.Stopped });
            }
        }, 150);
    }
    postMessage({ data: status === WorkerStatuses.ForceStopped ? data : matrix || data, status });
};