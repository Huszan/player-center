import pcLogo from '../../resources/player-center-logo.svg';
import './BigLogo.scss';

export default function BigLogo({ showDesc = true }) {
    return (
        <div className="big-logo">
            <div className='logo-wrapper'>
                <h1 className='title'>PLAYER <br /> CENTER</h1>
                <img src={ pcLogo } alt=''></img>
            </div>
            {
                showDesc && 
                <div className='description'>
                    Play anytime, anywhere, without any costs or downloads required, and challenge your friends to join in the fun!
                </div>
            }
        </div>
    )
}