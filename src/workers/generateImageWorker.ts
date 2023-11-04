import { ImageWorkerData } from "@/types/types";
import { getGameOfLifeResult } from "@/utils/gameOfLife";
import { parseInitialState } from "@/utils/parsers";

addEventListener('message', async (event: MessageEvent<ImageWorkerData>) => {
    try {
        const { canvas, content } = event.data;
        const result = parseInitialState(content);
        if(!result.success) {
            postMessage({ success: false });
            return;
        }

        const data = getGameOfLifeResult(result.matrix, result.iterationCount);
        const ctx = canvas.getContext('2d');
        if(ctx) {
            const width = canvas.width;
            const height = canvas.height;
            ctx.fillStyle = 'black';
            ctx.fillRect(0,0, width, height);
            const dataHeight = data.length;
            const dataWidth = data[0].length;
            const cellWidth = width / dataWidth;
            const cellHeight = height / dataHeight;
            for(let y = 0; y < dataHeight; y++) {
                for(let x = 0; x < dataWidth; x++) {
                    if(data[y]?.[x]) {
                        ctx.fillStyle = 'white';
                        ctx.fillRect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
                    }
                }
            }
            ctx.commit?.();
            postMessage({ success: true } );
        } else {
            postMessage({ success: false });
        }
    } catch(error) {
        postMessage({ success: false, error })
    }
});