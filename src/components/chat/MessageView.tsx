import { getMessageById } from "@/redux/messages/selectors";
import { useAppSelector } from "@/redux/store";
import clx from 'classnames';
import { Fragment } from "react";
import ChatImage from "./ChatImage";
import GPTAnswer from "./GPTAnswer";
import GenerateImage from "./GenerateImage";
import styles from './styles.module.scss';

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

    const { user, role, content, notAnswered, parsing, image } = message;
    const showPlaceholder = notAnswered && !content;

    return (
        <section className={clx(styles[`message--${role}`], "px-4 py-2 rounded-lg mb-2 border border-gray-200")}>
            <div className="font-bold">{user ?? role}:</div>
            <div className={clx(styles.content, 'break-words')}>
                {showPlaceholder &&<div className="italic">{placeholder}</div>}
                <ContentView content={content} id={id} />
            </div>
            {notAnswered && <GPTAnswer id={id} />}
            {parsing && <GenerateImage id={id} content={content}/>}
            <ChatImage image={image} />
        </section>
    );
}