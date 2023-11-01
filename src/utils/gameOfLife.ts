import { Matrix } from "@/types/types";

const countNeighbors = (
    data: Matrix,
    x: number,
    y: number): number => { // count of neighbors
    let total = 0;
    const width = data.length;
    const height = data?.[0]?.length ?? 0;

    if(!width || !height) return 0;

    // Check top
    if(y > 0) {
        total += data[x][y - 1] ? 1 : 0;
    }
    // Check bottom
    if(y < height - 1) {
        total += data[x][y + 1] ? 1 : 0;
    }
    // Check left
    if(x > 0) {
        total += data[x - 1][y] ? 1 : 0;
    }
    // Check right
    if(x < width - 1) {
        total += data[x + 1][y] ? 1 : 0;
    }
    // Check top-left
    if(y > 0 && x > 0) {
        total += data[x - 1][y -1] ? 1 : 0;
    }
    // Check top-right
    if(y > 0 && x < width - 1) {
        total += data[x + 1][y - 1] ? 1 : 0;
    }
    // Check bottom-left
    if(y < height - 1 && x > 0) {
        total += data[x - 1][y + 1] ? 1 : 0;
    }
    // Check bottom-right
    if(y < height - 1 && x < width - 1) {
        total += data[x + 1][y + 1] ? 1 : 0;
    }
    return total;
}

const convert = (value:boolean) => value ? 1 : 0;

export default function gameOfLife(data: Matrix) {
    const width = data.length;
    const height = data?.[0]?.length ?? 0;

    if(!width || !height) return data;

    const newData = data.map(d=>d.slice());

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