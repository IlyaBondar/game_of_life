export type MatrixItem = 0 | 1;

export type Matrix = MatrixItem[][];

export enum WorkerCommands {
    Start = 'start',
    Pause = 'pause',
    Stop = 'stop'
}

export type GameWorkerData = {
    data: Matrix,
    status: WorkerCommands
};

export type ImageWorkerData = {
    content: string;
    width?: number;
    height?: number;
};

export type ImageWorkerResponse = {
    image?: string;
    parsed: boolean;
    success: boolean;
};

export enum MessageRole {
    System = 'system',
    User = 'user',
    Assistant = 'assistant'
}

export type Message = {
    id: string;
    user?: string;
    role: MessageRole;
    content: string;
    notAnswered?: boolean;
    startParse?: boolean;
    questionId?: string;
    image?: string;
}