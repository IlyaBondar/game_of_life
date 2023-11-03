import { Message } from "@/types/types";
import { generateUserKey } from "./utils";

export interface IStorage<T extends { id: string}> {
    getAllData: (user: string) => T[];
    setAllData: (user: string, data: T[]) => void;
    getDataById: (user: string, id: string) => T | undefined;
}

export class LocalStorage<T extends { id: string}> implements IStorage<T> {
    public getAllData(user: string) {
        const key = generateUserKey(user);
        const cache = localStorage.getItem(key);
        return (cache ? JSON.parse(cache) : []) as T[]
    }
    public setAllData(user: string, data:T[]) {
        const key = generateUserKey(user);
        localStorage.setItem(key, JSON.stringify(data));
    }
    public getDataById(user: string, id: string) {
        const key = generateUserKey(user);
        const cache = localStorage.getItem(key);
        const data = cache ? JSON.parse(cache) as T[] : [];
        return data.find(({ id: _id }) => id === _id)
    }
}

class MessageStorage extends LocalStorage<Message> {}

const messageStorage = new MessageStorage();

export default messageStorage;