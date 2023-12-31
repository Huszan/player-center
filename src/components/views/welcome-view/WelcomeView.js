import './WelcomeView.scss'
import { useContext } from 'react'
import { WindowContext } from '../../../utils/WindowManager'
import { Link, useOutlet } from 'react-router-dom';
import HorizontalLogo from '../../horizontal-logo/HorizontalLogo';
import VerticalLogo from '../../vertical-logo/VerticalLogo';

export default function WelcomeView(props) {
    const window = useContext(WindowContext);
    const outlet = useOutlet();

    return (
        <div className='welcome-view'>
            {window.isMobile ? <HorizontalLogo /> : <VerticalLogo />}
            {
                outlet ||
                <div className='nav-wrapper'>
                    <Link className='nav-item noselect' to="/host">HOST</Link>
                    <Link className='nav-item noselect' to="/join">JOIN</Link>
                </div>
            }
        </div>
    )
}