import { ImageWorkerData } from "@/types/types";
import { getGameOfLifeResult } from "@/utils/gameOfLife";
import { parseInitialState } from "@/utils/parsers";
//import { createCanvas } from "canvas";

const RECT_WIDTH = 300;
const RECT_HEIGHT = 300;

addEventListener('message', async (event: MessageEvent<ImageWorkerData>) => {
    const { content, width = RECT_WIDTH, height = RECT_HEIGHT } = event.data;
    const result = parseInitialState(content);
    if(!result.success) {
        postMessage({ parsed: true, success: false });
        return;
    }

    const data = getGameOfLifeResult(result.matrix, result.iterationCount);

    // const canvas = createCanvas(width, height);
    // const ctx = canvas.getContext('2d');
    // const dataHeight = data.length;
    //     const dataWidth = data[0].length;
    //     var cellWidth = width / dataWidth;
    //     var cellHeight = height / dataHeight;
    //     for(let i = 0; i < dataWidth; i++) {
    //         for(let j = 0; j < dataHeight; j++) {
    //             if(data[i]?.[j]) {
    //                 ctx.fillStyle = 'white';
    //                 ctx.fillRect(j*cellWidth, i*cellHeight, cellWidth, cellHeight);
    //             }
    //         }
    //     }

    postMessage({ parsed: true, image:'' /*canvas.toDataURL("image/png")*/, success: true });
});