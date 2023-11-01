import { Matrix, WorkerCommands, WorkerData } from "@/types/types";
import gameOfLife from "@/utils/gameOfLife";
import isEqual from "lodash-es/isEqual";

let intervalId: NodeJS.Timeout;
let matrix: Matrix;
addEventListener('message', (event: MessageEvent<WorkerData>) => {
    clearInterval(intervalId);
    console.log(event);
    const { status, data } = event.data;
    if(status === WorkerCommands.Start) {
        matrix = data;
        intervalId = setInterval(()=> {
            const result = gameOfLife(matrix);
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