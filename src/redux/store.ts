import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import messageSlice from './messages/messageSlice';

export const store = configureStore({
    reducer: {
        [messageSlice.name]: messageSlice.reducer
    },
    devTools: true,
});

export type AppStore = typeof store;
export type AppGetState = AppStore['getState'];
export type AppState = ReturnType<AppGetState>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;