'use client'

import {
    ChangeEvent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import SSE from './SSE';
import styles from './styles.module.css';
import Button from '../shared/Button';
import { Message, MessageRole } from '@/types/types';
import MessageView from './MessageView';
import { v4 as uuid } from 'uuid';
import { systemValue } from '@/utils/constants';
import clx from 'classnames';
import { generateUserKey } from '@/utils/utils';

export default function GPTChat() {
    const user = 'Ilya'; // TODO: Social login
    const key = generateUserKey(user);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [initialized, setInitialized] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [output, setOutput] = useState<Message[]>([]);
    const outputBottomRef = useRef<HTMLSpanElement>(null);
    useEffect(()=> {
        const cache = localStorage.getItem(key);
        if(cache)
        {
            setOutput(JSON.parse(cache));
        } else {
            setOutput([systemValue]);
        }
        setInitialized(true);
        inputRef.current?.focus();
    },[key])
    useEffect(()=> {
        outputBottomRef.current?.scrollIntoView();
        if(initialized) {
            setTimeout(()=> {
                localStorage.setItem(key, JSON.stringify(output));
            })
        }
    },[output, initialized, key]);

    const onClick = useCallback((e: Event) => {
        e.preventDefault();
        const content = inputValue.trim();
        if(!content) return;
        const newOutput = [
            ...output,
            {
                id: uuid(),
                user,
                role: MessageRole.User,
                content
            }
        ];
        setOutput(newOutput);
        setInputValue('');
        inputRef.current?.focus();
    }, [output, inputValue]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if(e.key == 'Enter' && e.ctrlKey) {
            e.preventDefault();
            // @ts-ignore
            onClick(e);
        }
    },[onClick]);

    const onClear = useCallback((e: MouseEvent) => {
        e.preventDefault();
        setOutput([systemValue]);
        inputRef.current?.focus();
    }, []);

    const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }, [])
    return (
        <div className='chat flex flex-col'>
            <label htmlFor='chat__input'>GPT:</label>
            <div id='chat__output' className={styles.output}>
                {output.map((message)=>(
                    <MessageView key={message.id} {...message}/>
                ))}
                { !initialized && <span>Loading...</span> }
                <span ref={outputBottomRef}></span>
            </div>
            <textarea id="chat__input"
                placeholder='Enter command for GPT chat (Ctrl-Enter to send)'
                value={inputValue}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className={clx(styles.input)}
                rows={10}
                autoFocus={true}
                ref={inputRef}
            />
            <div className='flex my-3 gap-2'>
                <Button id="chat__send" onClick={onClick} disabled={!inputValue.trim()}>Send</Button>
                <Button id="chat__reset" onClick={onClear}>Clear History</Button>
            </div>
            <SSE/>
        </div>
    );
}