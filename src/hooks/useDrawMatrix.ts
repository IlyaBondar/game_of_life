import { Matrix } from '@/types/types';
import { useEffect, useRef } from 'react';

export default function useDrawMatrix (data: Matrix) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        if(!canvasRef.current) return;
        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height
        if(!canvasRef.current || !canvasRef.current.getContext) return;
        const ctx = canvasRef.current.getContext('2d');
        if(!ctx) return;
        //clear
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        //empty initial state
        if(!data.length || !data[0].length) return;
        const dataHeight = data.length;
        const dataWidth = data[0].length;
        const cellWidth = canvasWidth / dataWidth;
        const cellHeight = canvasHeight / dataHeight;
        for(let y = 0; y < dataHeight; y++) {
            for(let x = 0; x < dataWidth; x++) {
                if(data[y]?.[x]) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
                }
            }
        }
    },[data]);

    return canvasRef;
}