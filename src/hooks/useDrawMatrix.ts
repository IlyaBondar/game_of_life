import { Matrix } from '@/types/types';
import { useEffect, useRef } from 'react';

const RECT_WIDTH = 500;
const RECT_HEIGHT = 500;

export default function useDrawMatrix (data: Matrix, canvasWidth = RECT_WIDTH, canvasHeight = RECT_HEIGHT) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=> {
        if(!canvasRef.current) return;
        canvasRef.current.width = canvasWidth;
        canvasRef.current.height = canvasHeight;
    },[canvasHeight, canvasWidth])

    useEffect(()=>{
        if(!canvasRef.current || !canvasRef.current.getContext) return;
        const ctx = canvasRef.current.getContext('2d');
        if(!ctx) return;
        //clear
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        //empty initial state
        if(!data.length || !data[0].length) return;
        const dataWidth = data.length;
        const dataHeight = data[0].length;
        const cellWidth = canvasWidth / dataWidth;
        const cellHeight = canvasHeight / dataHeight;
        for(let i = 0; i < dataWidth; i++) {
            for(let j = 0; j < dataHeight; j++) {
                if(data[i][j]) {
                    ctx.fillRect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
                }
            }
        }
    },[canvasHeight, canvasWidth, data]);

    return canvasRef;
}