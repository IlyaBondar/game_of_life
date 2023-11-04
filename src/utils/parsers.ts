import { MatrixItem } from "@/types/types";
import { isEmpty } from "lodash-es";

type Result = {
    success: true;
    matrix: MatrixItem[][];
    iterationCount: number;
  } | { success: false }

export const parseInitialState = (text: string): Result => {
    const parts = text
      .trim() // trim whitespaces and line breaks
      .split('```') // code markdown
      .slice(1) // ignore before block
      .filter(v=>!isEmpty(v.trim())); // ignore empty
    if(parts.length === 2) {
      try {
        const [matrixString, iterationCountString] = parts;
        const match = iterationCountString.trim().match(/\d+/);
        const iterationCount = parseInt(match ? match[0] : '-1');
        const lines = matrixString
          .trim() // trim whitespaces and line breaks
          .split('\n'); // split by line breaks
        const matrix = lines.map(
          line=>line
          .trim() // trim whitespaces and line breaks
          .split('') // split 0&1 string
          .map(cell => cell === '0'? 0 : 1) // 0&1 format
        );
        if(iterationCount >= 0 && matrix.length && matrix[0].length) {
          return {
              success: true,
              iterationCount,
              matrix
          }
        }
      } catch(e) { console.error(e) }
    }
    return {
      success:false
    };
  }

