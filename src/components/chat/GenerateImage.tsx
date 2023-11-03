import { updateMessage } from "@/redux/messages/messageSlice";
import { useAppDispatch } from "@/redux/store";
import { ImageWorkerResponse } from "@/types/types";
import { useEffect, useRef } from "react";

type Props = {
    id: string;
    content: string;
}

export default function GenerateImage({ id, content }:Props) {
    const workerRef = useRef<Worker>()
    const dispatch = useAppDispatch();
    useEffect(() => {
        workerRef.current = new Worker(new URL(`@/workers/generateImageWorker.ts`, import.meta.url))
        workerRef.current.onmessage = (event: MessageEvent<ImageWorkerResponse>) => {
            const { parsed, image } = event.data;
            // if(success) {
            //     fetch(`/api/generate`,{
            //         method: 'POST',
            //         headers: {
            //             'Content-type': 'application/json',
            //         },
            //         body: JSON.stringify({
            //             matrix: finalState,
            //             width: 300,
            //             height: 300
            //         }),
            //     })
            //     .then((res) => res.json())
            //     .then(({ image }) => {
            //         dispatch(updateMessage({ id, startParse: !parsed, image }))
            //     })
            //     .catch(e => console.error(e));
            // } else {
            dispatch(updateMessage({ id, startParse: !parsed, image }));
            // }
            workerRef.current?.terminate();
        }
        workerRef.current?.postMessage({
            content
        });
        return () => {
            workerRef.current?.terminate()
        }
    }, [content, dispatch, id])
    return null;
}