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
            dispatch(updateMessage({ id, startParse: !parsed, image }));
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