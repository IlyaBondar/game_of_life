import { Message } from '@/types/types';
import { systemValue } from '@/utils/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Message[] = [systemValue];
type State = typeof initialState;

export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state: State, action: PayloadAction<Message>) => [
            ...state,
            action.payload
        ],
        addMessages: (state: State, action: PayloadAction<Message[]>) => [
            ...state,
            ...action.payload
        ],
        updateMessage: (state: State, action: PayloadAction<Partial<Message>>) => {
            const { id, ...rest } = action.payload;
            const index = state.findIndex(m=>m.id === id);
            state[index] = { ...state[index], ...rest }
        },
        setMessages: (_: State, action: PayloadAction<Message[]>) => action.payload,
        resetMessages: () => initialState
    },
  });

export const {
    addMessage,
    addMessages,
    updateMessage,
    setMessages,
    resetMessages
} = messageSlice.actions;
export default messageSlice;