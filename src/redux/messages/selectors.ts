import { Message } from "@/types/types";
import { createSelector } from 'reselect';
import { AppState } from "../store";

export const getMessages = (state:AppState) => state.messages;

export const getMessageIds = createSelector(getMessages, messages => messages.map(mes=>mes.id));

export const getMessageById = (state:AppState,id:string) => getMessages(state).find(mes=>mes.id === id);

export const getMessageBefore = (id:string, messages: Message[]) => {
    const index = messages.findIndex(mes=>mes.id===id);
    return messages.slice(0, index > 0 ? index : 1);
};
