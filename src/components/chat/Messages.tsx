'use client';

import { getMessageIds, getMessages } from "@/redux/messages/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Fragment, useEffect, useRef, useState } from "react";
import styles from './styles.module.scss';
import MessageView from "./MessageView";
import MessageStorage from "@/utils/storage";
import { useUser } from "@/hooks/useUser";
import { setMessages } from "@/redux/messages/messageSlice";
import { BOT_DISPLAY_NAME, DEFAULT_USER, systemValue } from "@/utils/constants";

export default function Messages() {
    const user = useUser();
    const messageIds = useAppSelector(getMessageIds);
    const messages = useAppSelector(getMessages);
    const [initialized, setInitialized] = useState(false);
    const outputBottomRef = useRef<HTMLSpanElement>(null);
    const dispatch = useAppDispatch()
    useEffect(()=> {
        const cache = user !== DEFAULT_USER ? MessageStorage.getAllData(user) : [];
        dispatch(setMessages(cache.length ? cache : [systemValue]));
        setInitialized(true);
    },[dispatch, user])
    useEffect(()=> {
        outputBottomRef.current?.scrollIntoView();
        if(initialized) {
            setTimeout(()=> {
                MessageStorage.setAllData(user, messages);
            })
        }
    },[messageIds, initialized, user, messages]);
    return (
        <div id='chat__output' className={styles.output}>
            {messageIds.map(id=>(
                <Fragment key={id}>
                    <MessageView id={id}/>
                </Fragment>
            ))}
            { !initialized && <span>Loading...</span> }
            <span ref={outputBottomRef}></span>
        </div>
    )
}