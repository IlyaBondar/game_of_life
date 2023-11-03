import { useUser } from "@/hooks/useUser";
import { updateMessage } from "@/redux/messages/messageSlice";
import { convertToGTP, getMessageBefore } from "@/redux/messages/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import messageStorage from "@/utils/storage";
import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

type Props = {
    id: string
}

export default function GPTAnswer({ id }: Props) {
    const user = useUser();
    const responseRef = useRef('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        let eventSource: EventSource;

        // only one reason for this timeout:
        // in dev mode effect executed twice and to avoid two request to AI API
        const timeout = setTimeout(() => {
            const allMessages = messageStorage.getAllData(user);
            const messages = convertToGTP(getMessageBefore(id, allMessages));

            eventSource = new EventSource(`/api/gpt?messages=${JSON.stringify(messages)}`);
            eventSource.addEventListener("message", (e) => {
                const value = decodeURIComponent(e.data)
                responseRef.current = `${responseRef.current}${value}`;
                dispatch(updateMessage({ id, content: responseRef.current }));
            });
            eventSource.addEventListener("end", (e) => {
                dispatch(updateMessage({ id, notAnswered: false, startParse: true }));
                eventSource.close();
            });
            eventSource.addEventListener("error", (e:MessageEvent) => {
                eventSource.close();
                console.error(e.data || e)
            });
        },10);

        return () => {
            eventSource?.close();
            clearTimeout(timeout);
        };
    },[dispatch, id, user])

    return null;
}