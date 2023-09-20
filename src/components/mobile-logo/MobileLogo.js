import pcLogo from '../../resources/player-center-logo.svg';
import './MobileLogo.scss';

export default function MobileLogo({ showDesc = true }) {
    return (
        <div className="mobile-logo">
            <div className='logo-wrapper'>
                <img src={ pcLogo } alt=''></img>
                <h1 className='title'>PLAYER <br /> CENTER</h1>
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