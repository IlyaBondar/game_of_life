import { Matrix } from '@/types/types';
import { useEffect, useRef } from 'react';

var RECT_WIDTH = 500;
var RECT_HEIGHT = 500;

export default function useDrawMatrix ( data: Matrix) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=> {
        if(!canvasRef.current) return;
        canvasRef.current.width = RECT_WIDTH;
        canvasRef.current.height = RECT_HEIGHT;
    },[])

    useEffect(()=>{
        if(!canvasRef.current || !canvasRef.current.getContext) return;
        const ctx = canvasRef.current.getContext('2d');
        if(!ctx) return;
        //clear
        ctx.clearRect(0,0,RECT_WIDTH,RECT_HEIGHT);
        //empty initial state
        if(!data.length || !data[0].length) return;
        const width = data.length;
        const height = data[0].length;
        var cellWidth = RECT_WIDTH / width;
        var cellHeight = RECT_HEIGHT / height;
        for(let i = 0; i < width; i++) {
            for(let j = 0; j < height; j++) {
                if(data[i][j]) {
                    ctx.fillRect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
                }
            }
        }
    },[data]);

    return canvasRef;
}