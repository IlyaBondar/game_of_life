import { AppDispatch, AppGetState } from "../store";
import { convertToGTP, getMessageBefore, getMessages } from "./selectors";
import { updateMessage } from "./messageSlice";

export const getGPTAnswer = (id: string) => async (dispatch: AppDispatch, getState: AppGetState) => {
    const state = getState()

    const allMessages = getMessages(state);
    const messages = convertToGTP(getMessageBefore(id, allMessages));
    let response = '';

    const eventSource = new EventSource(`/api/gpt?messages=${JSON.stringify(messages)}`);
    eventSource.addEventListener("message", (e) => {
        const value = decodeURIComponent(e.data)
        response = `${response}${value}`;
        dispatch(updateMessage({ id, content: response }));
    });
    eventSource.addEventListener("end", () => {
        dispatch(updateMessage({ id, parsing: true }));
        eventSource.close();
    });
    eventSource.addEventListener("error", (e:MessageEvent) => {
        eventSource.close();
        console.error(e.data || e)
    });
}