import './Chat.scss';
import HideSvg from '../../resources/hide.svg';
import SendSvg from '../../resources/send.svg';
import ChatSvg from '../../resources/chat.svg';
import { useState } from 'react';
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
    const [form, setForm] = useState({
        message: ''
    });
    const messageElements = messages.map((message, i) => {
        let userColor = stringToHslColor(message.user.id);
        return (
            <span key={i}>
                <b style={{color: `${userColor}`}}>{`${message.user.name}#${message.user.id}`}:</b> {message.content}
            </span>
        )
    })

    function resetForm() {
        setForm({
            message: ''
        })
    }

    function toggle() {
        setIsOpen(prev => !prev);
    }

    function handleChange(event) {
        let {name, value} = event.target;
        setForm(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (form.message.trim().length === 0) return;
        setMessages(prev => {
            return [
                ...prev,
                {
                    user: {
                        id: '1234',
                        name: 'Host',
                    },
                    content: form.message,
                },
            ]
        })
        resetForm();
    }

    return (
        <div className='chat-overlay'>
            {
                isOpen ?
                <div className='chat'>
                    <img src={ HideSvg } onClick={toggle} className='icon-medium' alt=''></img>
                    <div className='messages'>
                        { messageElements }
                    </div>
                    <form className='send-form' onSubmit={handleSubmit}>
                        <input name='message' placeholder='Write message here..' value={form.message} onChange={handleChange}></input>
                        <button className='rounded secondary'><img src={SendSvg} className='icon-medium' alt=''></img></button>
                    </form>
                </div> :
                <button className='rounded secondary'><img src={ChatSvg} className='icon-medium' onClick={toggle} alt=''></img></button>
            }
        </div>
    )
}