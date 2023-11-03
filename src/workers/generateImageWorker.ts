import { ImageWorkerData } from "@/types/types";
import { getGameOfLifeResult } from "@/utils/gameOfLife";
import { parseInitialState } from "@/utils/parsers";

addEventListener('message', async (event: MessageEvent<ImageWorkerData>) => {
    const { content } = event.data;
    const result = parseInitialState(content);
    if(!result.success) {
        postMessage({ parsed: true, image: '', success: false });
        return;
    }

    const finalState = getGameOfLifeResult(result.matrix, result.iterationCount);
    try {
        const response = await fetch(`/api/image?matrix=${JSON.stringify(finalState)}&width=300&height=300`,{
            method: 'GET',
            // cache: "no-cache",
            // headers: {
            //     'Content-type': 'application/json',
            // },
            // body: JSON.stringify({
            //     matrix: finalState,
            //     width:300,
            //     height:300
            // }),
        });
        const { image } = await response.json();
        postMessage({ parsed: true, image, success: true });
    } catch (error) {
        console.error("Error:", error);
    }


});