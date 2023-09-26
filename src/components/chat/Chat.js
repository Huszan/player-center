import './Chat.scss';
import HideSvg from '../../resources/hide.svg';
import SendSvg from '../../resources/send.svg';
import ChatSvg from '../../resources/chat.svg';
import { useEffect, useState } from 'react';
import { stringToHslColor } from '../../utils/HelperFunctions';

const template = {
    messages: [
        {
            user: {
                id: '1234',
                name: 'Host',
            },
            content: `Wow, this site is totally awesome! I can't wait to play something with yall :D`,
        },
        {
            user: {
                id: '4321',
                name: 'User',
            },
            content: `I know right!?`,
        },
        {
            user: {
                id: '2314',
                name: 'User',
            },
            content: `LOL`,
        },
    ]
}


export default function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(template.messages);
    const [message, setMessage] = useState('');
    const messageElements = messages.map((message, i) => {
        let userColor = stringToHslColor(message.user.id);
        return (
            <span key={i}>
                <b style={{color: `${userColor}`}}>{`${message.user.name}#${message.user.id}`}:</b> {message.content}
            </span>
        )
    })

    useEffect(() => {
        const messagesElement = document.getElementById('chat--messages');
        if (!messagesElement) return;
        messagesElement.scrollTo({ top: messagesElement.scrollHeight, behavior: 'smooth' });
    }, [messages])

    function toggle() {
        setIsOpen(prev => !prev);
    }

    function handleChange(event) {
        let {value} = event.target;
        setMessage(value);
    }

    function handleSend(event) {
        event.preventDefault();
        if (message.trim().length === 0) return;
        setMessages(prev => {
            return [
                ...prev,
                {
                    user: {
                        id: '1234',
                        name: 'Host',
                    },
                    content: message,
                },
            ]
        })
        setMessage('');
    }

    return (
        <div className='chat-overlay'>
            {
                isOpen ?
                <div className='chat'>
                    <img src={ HideSvg } onClick={toggle} className='icon-small' alt=''></img>
                    <div id='chat--messages' className='messages'>
                        { messageElements }
                    </div>
                    <div className='send-wrapper'>
                        <input name='message' placeholder='Write message here..' value={message} onChange={handleChange}></input>
                        <img src={SendSvg} onClick={handleSend} className='icon-medium' alt=''></img>
                    </div>
                </div> :
                <button className='rounded secondary'><img src={ChatSvg} className='icon-medium' onClick={toggle} alt=''></img></button>
            }
        </div>
    )
}