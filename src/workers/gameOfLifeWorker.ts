import { Matrix, WorkerCommands, GameWorkerData } from "@/types/types";
import gameOfLifeIteration from "@/utils/gameOfLife";
import isEqual from "lodash-es/isEqual";

let intervalId: NodeJS.Timeout;
let matrix: Matrix;
addEventListener('message', (event: MessageEvent<GameWorkerData>) => {
    clearInterval(intervalId);
    const { status, data } = event.data;
    if(status === WorkerCommands.Start) {
        matrix = data;
        intervalId = setInterval(()=> {
            const result = gameOfLifeIteration(matrix);
            if(!isEqual(matrix, result)) {
                matrix = result;
                postMessage({ data: matrix, status });
            } else {
                clearInterval(intervalId);
                postMessage({ data: matrix, status: WorkerCommands.Stop });
            }
        }, 150);
    }
    postMessage({ data: matrix, status });
});