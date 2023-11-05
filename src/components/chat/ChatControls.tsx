'use client';

import { useUser } from "@/hooks/useUser";
import { addMessages, resetMessages } from "@/redux/messages/messageSlice";
import { getGPTAnswer } from "@/redux/messages/thunk";
import { useAppDispatch } from "@/redux/store";
import { createPairMessages } from "@/utils/utils";
import clx from 'classnames';
import { ChangeEvent, KeyboardEvent, useCallback, useRef, useState } from "react";
import Button from "../shared/Button";

export default function ChatControls() {
    const dispatch = useAppDispatch()
    const user = useUser();
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState('');
    const setValue = useCallback(() => {
        const content = inputValue.trim();
        if(!content) return;
        const messages = createPairMessages(content, user);
        dispatch(addMessages(messages));
        dispatch(getGPTAnswer(messages[1].id));
        setInputValue('');
        inputRef.current?.focus();
    }, [dispatch, inputValue, user])
    const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setValue();
    },[setValue]);
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if(e.key == 'Enter' && e.ctrlKey) {
            e.preventDefault();
            setValue();
        }
    },[setValue]);
    const onClear = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(resetMessages());
        inputRef.current?.focus();
    }, [dispatch]);
    const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    },[])
    const hasValue = !inputValue.trim().length;
    return (
        <>
            <textarea id="chat__input"
                placeholder='Enter command for GPT chat (Ctrl-Enter to send)'
                value={inputValue}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className={clx(
                    "h-28 focus:outline-none focus:placeholder-gray-400 text-gray-800",
                    "placeholder-gray-500 bg-gray-100 rounded-md p-3 w-full h-28 border"
                    )}
                rows={10}
                autoFocus
                ref={inputRef}
            />
            <div className='flex my-3 gap-2 justify-between'>
                <Button id="chat__send" onClick={onClick} disabled={hasValue}>Send</Button>
                <Button id="chat__reset" onClick={onClear}>Clear History</Button>
            </div>
        </>
    )
}

