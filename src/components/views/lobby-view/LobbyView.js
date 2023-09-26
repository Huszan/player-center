import { useContext, useState } from 'react';
import { WindowContext } from '../../../utils/WindowManager';
import './LobbyView.scss';

import SettingsSvg from '../../../resources/settings.svg';
import ControllerSvg from '../../../resources/controller.svg';
import ChatSvg from '../../../resources/chat.svg';

import LobbyGeneralPanel from '../../lobby-general-panel/LobbyGeneralPanel';
import GameList from '../../game-list/GameList';
import Chat from '../../chat/Chat';

const navItems = [
    {
        key: 'settings',
        icon: SettingsSvg,
        component: <LobbyGeneralPanel />,
    },
    {
        key: 'games',
        icon: ControllerSvg,
        component: <GameList />,
    },
]

export default function LobbyView() {
    const [activatedRoute, setActivatedRoute] = useState('settings');
    const window = useContext(WindowContext);
    const navElements = navItems.map(nav => {
        return (
            <span 
                key={nav.key} 
                className={`item ${activatedRoute === nav.key && 'active'}`} 
                onClick={() => {setActivatedRoute(nav.key)}}
            >
                <img src={ nav.icon } className='center-abs'></img>
            </span>
        )
    }) 
    const currentComponent = navItems.find(el => {return el.key === activatedRoute}).component;

    return (
        <div className='lobby-view'>
            <nav className='navigator'>
                { navElements }
            </nav>
            <Chat />
            { currentComponent }
        </div>
    )
}