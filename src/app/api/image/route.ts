import { Matrix } from "@/types/types";
import { createCanvas } from "canvas";
import { isArray } from "lodash-es";
import { NextRequest } from "next/server";

const RECT_WIDTH = 500;
const RECT_HEIGHT = 500;

export async function POST(req: NextRequest) {
    const { matrix, width = RECT_WIDTH, height = RECT_HEIGHT } = await req.json();
    try {
        if(!matrix) {
            return new Response('Error: please provide "matrix" parameter', {
                status: 400,
                statusText: 'Error: please provide "matrix" parameter'
            });
        }
        const data: Matrix = matrix;

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        if(!data.length || !isArray(data[0]) || !isArray(data[0])) {
            return new Response('Error: incorrect "matrix" parameter', {
                status: 400,
                statusText: 'Error: incorrect "matrix" parameter'
            });
        }

        const dataHeight = data.length;
        const dataWidth = data[0].length;
        var cellWidth = width / dataWidth;
        var cellHeight = height / dataHeight;
        for(let i = 0; i < dataWidth; i++) {
            for(let j = 0; j < dataHeight; j++) {
                if(data[i]?.[j]) {
                    ctx.fillStyle = 'white';
                    ctx.fillRect(j*cellWidth, i*cellHeight, cellWidth, cellHeight);
                }
            }
        }

        return new Response(canvas.toDataURL("image/png"));
    } catch(e) {
        console.error(e);
        return new Response(`Error: ${e}`, {
            status: 400,
            statusText: 'Error'
        });
    }
}