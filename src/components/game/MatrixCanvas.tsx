import useDrawMatrix from "@/hooks/useDrawMatrix";
import { Matrix } from "@/types/types";
import clx from "classnames";

type Props = {
    id: string,
    data: Matrix,
    className?: string
}

export default function MatrixCanvas({ id, data, className }:Props) {
    const canvasRef = useDrawMatrix(data);
    return (
        <canvas id={id}
            ref={canvasRef}
            className={clx('rounded border border-gray-200 bg-white max-w-sm max-h-96', className)}
        />
    );
}