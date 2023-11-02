import { Message } from "@/types/types";
import { BOT_DISPLAY_NAME } from '@/utils/constants';
import clx from 'classnames';
import { Fragment, useState, useEffect } from 'react';
import styles from './styles.module.css';
import { generateUserKey } from "@/utils/utils";

const placeholder = 'Loading...';

export default function GPTAnswer({ id, content, answered }: Message) {
    const [answer, setAnswer] = useState('');
    const [isStarted, setIsStarted] = useState(false);
    const lines = answer.split('\n');

    useEffect(() => {
        if(answered && isStarted) return;

        const key = generateUserKey('user');
        const cache = localStorage.getItem(key);
        const history: Message[] = cache ? JSON.parse(cache) : [];
        const messages = history.map(({ role, content }) => ({ role, content }))

        const eventSource = new EventSource(`/api/gpt?messages=${JSON.stringify(messages)}`);
        eventSource.addEventListener("message", (e) => {
            const value = atob(e.data)
            setAnswer(prevState => `${prevState}${value}`);
        });
        eventSource.addEventListener("end", (e) => {
            console.log("end", e);
            eventSource.close();
        });
        eventSource.addEventListener("open", (e) => {
            console.log("open", e);
        });
        eventSource.addEventListener("error", (e) => {
            eventSource.close();
            console.error(e)
            setIsStarted(false);
        });

        return () => {
            setIsStarted(false);
            eventSource.close();
        };
    },[answered, isStarted])

    return (
        <section className={clx(styles.message, styles["message--bot"])}>
            <div className={styles.message__user}>{BOT_DISPLAY_NAME}:</div>
            <div className={clx(styles.content, 'break-words')}>
                {!answer &&<div className="italic">{placeholder}</div>}
                {answer && lines.map((line, index) => (
                    <Fragment key={`${id}-${index}-answer`}>
                        {line}
                        <br/>
                    </Fragment>
                )) }
            </div>
        </section>
    );
}