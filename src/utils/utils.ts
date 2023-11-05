import { Message, MessageRole } from "@/types/types";
import { BOT_DISPLAY_NAME } from "@/utils/constants";
import { v4 as uuid } from 'uuid';
import { DEFAULT_USER } from "./constants";

export const generateUserKey = (userName?:string) => encodeURIComponent(userName ?? DEFAULT_USER);

export const createPairMessages = (content: string, user: string):Message[] => {
    const questionId = uuid();
    return [
        {
            id: questionId,
            user,
            role: MessageRole.User,
            content
        },
        {
            id: uuid(),
            user: BOT_DISPLAY_NAME,
            role: MessageRole.Assistant,
            content: '',
            questionId
        },
    ]
}