import './HostForm.scss'
import arrowBack from '../../resources/arrow_back.svg';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PopupContext } from '../../utils/PopupManager';
import { createLobby } from '../../utils/Firebase/Firebase';
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import { storageManager } from '../../utils/StorageManager';

const emptyForm = {
    username: '',
}

export default function HostForm() {
    const [form, setForm] = useState(emptyForm)
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
        createLobby(user).then(lobby => {
            if (lobby.id) {
                navigate(`/lobby/${lobby.id}`);
            }
        })
        setForm(emptyForm);
    }

    return (
        <form onSubmit={ submitForm } className='host-form'>
            <Link to={'/'} className='back-link'><img src={arrowBack} className='icon-small'></img></Link>
            <h3 className='title'>Host lobby</h3>

            <label htmlFor='username'>Username</label>
            <input id='username' type='text' placeholder='username' value={ form.username } onChange={ handleChange }></input>
            
            <button>Host</button>
        </form>
    )
}