import './HostForm.scss'
import arrowBack from '../../resources/arrow_back.svg';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PopupContext } from '../../utils/PopupManager';

export default function HostForm() {
    const [form, setForm] = useState({
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
        popupManager.pop.info(`Hosting game => ${JSON.stringify(form)}`);
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