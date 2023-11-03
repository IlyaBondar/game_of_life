import { ImageWorkerData } from "@/types/types";
import { getGameOfLifeResult } from "@/utils/gameOfLife";
import { parseInitialState } from "@/utils/parsers";

addEventListener('message', async (event: MessageEvent<ImageWorkerData>) => {
    const { content } = event.data;
    console.log('generate image worker');
    const result = parseInitialState(content);
    if(!result.success) {
        postMessage({ parsed: true, image: '', success: false });
        return;
    }

    const finalState = getGameOfLifeResult(result.matrix, result.iterationCount);
    console.log('final state', finalState);
    const image = await fetch(`/api/image`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            matrix: finalState,
            width:300,
            height:300
        }),
    })
      .then((res) => res.text())
      .then(img => img)
      .catch(e => console.log(e));

      postMessage({ parsed: true, image, success: true });
});