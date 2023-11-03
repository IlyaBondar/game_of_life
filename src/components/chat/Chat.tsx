import ChatControls from './ChatControls';
import Messages from './Messages';

export default function Chat() {
    return (
        <div className='chat flex flex-col'>
            <Messages/>
            <ChatControls/>
        </div>
    );
}