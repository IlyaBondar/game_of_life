import { Fragment } from 'react';
import { Message, MessageRole } from "@/types/types";
import styles from './styles.module.css';
import clx from 'classnames';

export default function MessageView({ id, user, role, content }: Message) {
    const lines = content.split('\n');
    return (
        <section className={clx(styles.message, {
            [styles["message--user"]]: role === MessageRole.User,
            [styles["message--bot"]]: role === MessageRole.Assistant,
            [styles["message--system"]]: role === MessageRole.System
        })}>
            <div className={styles.message__user}>{user ?? role}:</div>
            <div className={styles.content}>
                {lines.map((line, index) => (
                    <Fragment key={`${id}-${index}`}>
                        {line}
                        <br/>
                    </Fragment>
                )) }
            </div>
        </section>
    );
}