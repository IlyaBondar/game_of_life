import { Matrix } from "@/types/types";
import isEqual from "lodash-es/isEqual";

const convert = (value:boolean|number|undefined) => value ? 1 : 0;

const countNeighbors = (
    data: Matrix,
    x: number,
    y: number): number => { // count of neighbors
    let total = 0;
    const width = data.length;
    const height = data?.[0]?.length ?? 0;

    if(!width || !height) return 0;
    // clockwise check
    // Check top
    if(y > 0) {
        total += convert(data[x][y - 1]);
    }
    // Check top-right
    if(y > 0 && x < width - 1) {
        total += convert(data[x + 1][y - 1]);
    }
    // Check right
    if(x < width - 1) {
        total += convert(data[x + 1][y]);
    }
    // Check bottom-right
    if(y < height - 1 && x < width - 1) {
        total += convert(data[x + 1][y + 1]);
    }
    // Check bottom
    if(y < height - 1) {
        total += convert(data[x][y + 1]);
    }
    // Check bottom-left
    if(y < height - 1 && x > 0) {
        total += convert(data[x - 1][y + 1]);
    }
    // Check left
    if(x > 0) {
        total += convert(data[x - 1][y]);
    }
    // Check top-left
    if(y > 0 && x > 0) {
        total += convert(data[x - 1][y -1]);
    }
    return total;
}

export default function gameOfLifeIteration(data: Matrix) {
    const width = data.length;
    const height = data?.[0]?.length ?? 0;

    if(!width || !height) return data;

    const newData = data.map(d=>d.slice()); // potential stackOveflow - create copy for each iteration

    let n_neighbors;
    for(let i = 0; i < width; i++) {
        for(let j = 0; j < height; j++) {
            n_neighbors = countNeighbors(data, i, j);
            newData[i][j] = convert(data[i][j] ?
                n_neighbors == 2 || n_neighbors == 3 : // still alive
                n_neighbors == 3); // become alive
        }
    }
    return newData;
}

export function getGameOfLifeResult(data: Matrix, iterationCount: number) {
    const width = data.length;
    const height = data?.[0]?.length ?? 0;

    if(!width || !height) return data;
    // clone: only two arrays will be created and used
    let prev = data.map(d=>d.slice());
    let next = data.map(d=>d.slice());

    let n_neighbors;
    for(let it = 0; it < iterationCount; it++) {
        //swap arrays
        const temp = next;
        next = prev;
        prev = temp;
        for(let i = 0; i < width; i++) {
            for(let j = 0; j < height; j++) {
                n_neighbors = countNeighbors(prev, i, j);
                next[i][j] = convert(prev[i][j] ?
                    n_neighbors == 2 || n_neighbors == 3 : // still alive
                    n_neighbors == 3); // become alive
            }
        }
        if(isEqual(prev, next)) { // return if no changes after iteration
            return next;
        }
    }
    return next; // result after all iterations
}