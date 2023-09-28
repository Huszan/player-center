import { Link, useNavigate } from 'react-router-dom';
import './JoinForm.scss'
import arrowBack from '../../resources/arrow_back.svg';
import { useContext, useState } from 'react';
import { PopupContext } from '../../utils/PopupManager';
import { getLobby } from '../../utils/Firebase/Firebase';
import { storageManager } from '../../utils/StorageManager';
import uniqid from "uniqid";

export default function JoinForm() {
    const [form, setForm] = useState({
        lobbyId: '',
        username: '',
    })
    const popupManager = useContext(PopupContext);
    const navigate = useNavigate();

    function handleChange(event) {
        let {id, value} = event.target;
        setForm(prev => {
            return {
                ...prev,
                [id]: value
            }
        })
    }

    function submitForm(event) {
        event.preventDefault();
        let user = storageManager.get('user');
        if (!user || user.username !== form.username) {
            user = {
                id: user && user.id ? user.id : uniqid(),
                username: form.username,
            }
            storageManager.set('user', user)
        }
        getLobby(form.lobbyId).then(
            (lobby) => {
                navigate(`/lobby/${form.lobbyId}`, { state: { lobby }});
            },
            (rej) => {
                popupManager.pop.warning(rej);
            }
        );
    }

    return (
        <form onSubmit={ submitForm } className='join-form'>
            <Link to={'/'} className='back-link'><img src={arrowBack} className='icon-small'></img></Link>
            <h3 className='title'>Join lobby</h3>

            <label htmlFor='lobbyId'>LobbyID</label>
            <input id='lobbyId' type='text' placeholder='eg.: P4OJ3CTX' value={ form.lobbyId } onChange= { handleChange }></input>

            <label htmlFor='username'>Username</label>
            <input id='username' type='text' placeholder='username' value={ form.username } onChange= { handleChange }></input>

            <button>Join</button>
        </form>
    )
}