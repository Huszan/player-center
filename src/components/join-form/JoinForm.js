import { Link } from 'react-router-dom';
import './JoinForm.scss'
import arrowBack from '../../resources/arrow_back.svg';
import { useContext, useState } from 'react';
import { PopupContext } from '../../utils/PopupManager';

export default function JoinForm() {
    const [form, setForm] = useState({
        lobbyId: '',
        username: '',
    })
    const popupManager = useContext(PopupContext);

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
        popupManager.pop.info(`Joining game => ${JSON.stringify(form)}`);
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