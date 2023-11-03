import { ImageWorkerData } from "@/types/types";
import { getGameOfLifeResult } from "@/utils/gameOfLife";
import { parseInitialState } from "@/utils/parsers";

addEventListener('message', async (event: MessageEvent<ImageWorkerData>) => {
    const { content } = event.data;
    const result = parseInitialState(content);
    if(!result.success) {
        postMessage({ parsed: true, finalState: '', success: false });
        return;
    }

    const finalState = getGameOfLifeResult(result.matrix, result.iterationCount);
    postMessage({ parsed: true, finalState, success: true });
});