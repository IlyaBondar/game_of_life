import { Matrix } from "@/types/types";
import { createCanvas } from "canvas";
import { isArray } from "lodash-es";
import { NextRequest } from "next/server";

const RECT_WIDTH = 500;
const RECT_HEIGHT = 500;

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { matrix, width = RECT_WIDTH, height = RECT_HEIGHT } = await req.json();
        if(!matrix) {
            return Response.json({ error: 'Error: please provide "matrix" parameter'}, {
                status: 400,
                statusText: 'Error: please provide "matrix" parameter'
            });
        }
        const data: Matrix = matrix;

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        if(!data.length || !isArray(data[0]) || !isArray(data[0])) {
            return Response.json({ error: 'Error: incorrect "matrix" parameter' }, {
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

        return Response.json({ image: canvas.toDataURL("image/png") }, {
            status: 200,
        });
    } catch(e) {
        console.error(e);
        return Response.json({ error: `Error: ${e}`}, {
            status: 400,
            statusText: 'Error'
        });
    }
}