export type MatrixItem = 0 | 1;

export type Matrix = MatrixItem[][];

export enum WorkerStatuses {
    Started = 'started',
    Paused = 'paused',
    Stopped = 'stopped',
    ForceStopped = 'forceStopped'
}

export type GameWorkerData = {
    data: Matrix,
    status: WorkerStatuses
};

export type ImageWorkerData = {
    content: string;
    canvas: OffscreenCanvas;
};

export type ImageWorkerResponse = {
    success: boolean;
    error?: Error;
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
    parsing?: boolean;
    questionId?: string;
    image?: string;
}