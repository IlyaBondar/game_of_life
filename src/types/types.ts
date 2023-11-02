export type MatrixItem = 0 | 1;

export type Matrix = MatrixItem[][];

export enum WorkerCommands {
    Start = 'start',
    Pause = 'pause',
    Stop = 'stop'
}

export type WorkerData = {
    data: Matrix,
    status: WorkerCommands
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
    answered?: boolean;
    image?: Blob;
}