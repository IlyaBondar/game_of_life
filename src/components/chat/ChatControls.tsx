'use client';

import { useUser } from "@/hooks/useUser";
import { addMessages, resetMessages } from "@/redux/messages/messageSlice";
import { useAppDispatch } from "@/redux/store";
import { Matrix, Message, MessageRole } from "@/types/types";
import clx from 'classnames';
import { ChangeEvent, KeyboardEvent, useCallback, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';
import Button from "../shared/Button";
import styles from './styles.module.scss';
import { BOT_DISPLAY_NAME } from "@/utils/constants";
import MatrixImage from "./MatrixImage";
import fakeData from '@/utils/data/fakeData.json';

const createMessages = (content: string, user: string):Message[] => {
    const questionId = uuid();
    return [
        {
            id: questionId,
            user,
            role: MessageRole.User,
            content
        },
        {
            id: uuid(),
            user: BOT_DISPLAY_NAME,
            role: MessageRole.Assistant,
            content: '',
            notAnswered: true,
            questionId
        },
    ]
}

export default function ChatControls() {
    const dispatch = useAppDispatch()
    const user = useUser();
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState('');
    const onClick = useCallback((e: Event) => {
        e.preventDefault();
        const content = inputValue.trim();
        if(!content) return;
        dispatch(addMessages(createMessages(content, user)));
        setInputValue('');
        inputRef.current?.focus();
    }, [dispatch, inputValue, user]);
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if(e.key == 'Enter' && e.ctrlKey) {
            e.preventDefault();
            // @ts-ignore
            onClick(e);
        }
    },[onClick]);
    const onClear = useCallback((e: MouseEvent) => {
        e.preventDefault();
        dispatch(resetMessages());
        inputRef.current?.focus();
    }, [dispatch]);
    const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }, [])
    return (
        <>
        <textarea id="chat__input"
                placeholder='Enter command for GPT chat (Ctrl-Enter to send)'
                value={inputValue}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className={clx(styles.input)}
                rows={10}
                autoFocus
                ref={inputRef}
            />
            <div className='flex my-3 gap-2'>
                <Button id="chat__send" onClick={onClick} disabled={!inputValue.trim()}>Send</Button>
                <Button id="chat__reset" onClick={onClear}>Clear History</Button>
            </div>
            <MatrixImage matrix={fakeData.starting_state as Matrix} />
        </>
    )
}

