import { Message, MessageRole } from "@/types/types";

const prompt = `We are about to start playing Game of Life. Please generate random starting state and then iteration number.

The format is starting state must be 0 and 1 matrix in markdown code block, where 0 means dead cell and 1 represents life cell.
Matrix should have any number of columns between 20 and 100 and any number of rows between 20 and 100. Then comes single number number of iteration to generate between 1 and 100000.

Don't use natural language.`;

export const systemValue:Message = {
    id: 'system',
    role: MessageRole.System,
    content: prompt,
    answered: true
};

export const BOT_DISPLAY_NAME = 'GPT';