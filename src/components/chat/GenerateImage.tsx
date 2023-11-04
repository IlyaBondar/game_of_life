import { updateMessage } from "@/redux/messages/messageSlice";
import { useAppDispatch } from "@/redux/store";
import { ImageWorkerResponse } from "@/types/types";
import { IMAGE_SIZE } from "@/utils/constants";
import { useEffect, useRef } from "react";

type Props = {
    id: string;
    content: string;
}

export default function GenerateImage({ id, content }:Props) {
    const dispatch = useAppDispatch();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (window.Worker) {
            const worker = new Worker(new URL(`@/workers/generateImageWorker.ts`, import.meta.url))
            worker.onmessage = (event: MessageEvent<ImageWorkerResponse>) => {
                const { success, error } = event.data;
                if(success) {
                    setTimeout(()=> {
                        const image = canvasRef.current?.toDataURL();
                        dispatch(updateMessage({ id, parsing: false, image }));
                        worker?.terminate();
                    }, 500); // to be sure that drawing completed
                } else {
                    dispatch(updateMessage({ id, parsing: false }));
                    if(error) console.error(error);
                }
            }
            const offscreen = canvasRef.current?.transferControlToOffscreen();
            if(offscreen) {
                worker?.postMessage({
                    canvas: offscreen,
                    content,
                }, [offscreen]);
            }
            return () => {
                worker?.terminate()
            }
        }
    }, [content, dispatch, id])
    return (
        <canvas
            id={`${id}__canvas`}
            width={IMAGE_SIZE.width}
            height={IMAGE_SIZE.height}
            className="hidden"
            ref={canvasRef}
        />
    );
}