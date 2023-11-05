import ChatControls from './ChatControls';
import Messages from './Messages';

export default function Chat() {
    return (
        <div className='chat flex flex-col h-full w-full max-w-screen-md mx-auto'>
            <Messages/>
            <ChatControls/>
        </div>
    );
}