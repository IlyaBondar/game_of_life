import { getMessageById } from "@/redux/messages/selectors";
import { useAppSelector } from "@/redux/store";
import { MessageRole } from "@/types/types";
import clx from 'classnames';
import { Fragment } from "react";
import styles from './styles.module.scss';
import GPTAnswer from "./GPTAnswer";
import { parseInitialState } from "@/utils/parsers";

type ContentProps = {
    content: string,
    id: string
}
type MessageProps = {
    id: string
}
const placeholder = 'Loading...';

function ContentView({ content, id }: ContentProps) {
    if(!content.length) return null;
    const lines = content.length ? content.split('\n') : [];
    return (
        <>
            {lines.map((line, index) => (
                <Fragment key={`${id}-${index}`}>
                    {line}
                    <br/>
                </Fragment>
            ))}
        </>
    )
}

export default function MessageView({ id }: MessageProps) {
    const message = useAppSelector(state => getMessageById(state, id));
    if(!message)
        return (<div>Message not found</div>);

    const { user, role, content, notAnswered, image } = message;
    const showPlaceholder = notAnswered && !content;
    const result = !notAnswered && parseInitialState(content);

    return (
        <section className={clx(styles.message, styles[`message--${role}`])}>
            <div className={styles.message__user}>{user ?? role}:</div>
            <div className={clx(styles.content, 'break-words')}>
                {showPlaceholder &&<div className="italic">{placeholder}</div>}
                <ContentView content={content} id={id} />
            </div>
            {notAnswered && <GPTAnswer id={id} />}
        </section>
    );
}