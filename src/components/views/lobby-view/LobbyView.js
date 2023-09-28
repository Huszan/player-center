import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { WindowContext } from '../../../utils/WindowManager';
import './LobbyView.scss';

import SettingsSvg from '../../../resources/settings.svg';
import ControllerSvg from '../../../resources/controller.svg';
import { useNavigate } from 'react-router-dom';

import LobbyGeneralPanel from '../../lobby-general-panel/LobbyGeneralPanel';
import GameList from '../../game-list/GameList';
import Chat from '../../chat/Chat';
import { joinLobby } from '../../../utils/Firebase/Firebase';
import { PopupContext } from '../../../utils/PopupManager';
import { storageManager } from '../../../utils/StorageManager';

export default function LobbyView(props) {
    const [activatedRoute, setActivatedRoute] = useState('settings');
    const [lobby, setLobby] = useState(props.lobby);
    const { lobbyId } = useParams();
    const navigate = useNavigate();
    const popup = useContext(PopupContext);

    useEffect(() => {
        if (lobby) return;
        if (!storageManager.has('user')) {
            navigate('/join');
            popup.pop.warning('Please, give us your username first');
        }
        const user = storageManager.get('user');
        joinLobby(lobbyId, user).then(
            (res) => {
                setLobby(res);
            },
            (rej) => {
                navigate('/join');
                popup.pop.warning(rej);
            }
        )
    })

    const navItems = [
        {
            key: 'settings',
            icon: SettingsSvg,
            component: <LobbyGeneralPanel lobby={ lobby } />,
        },
        {
            key: 'games',
            icon: ControllerSvg,
            component: <GameList />,
        },
    ]
    const navElements = navItems.map(nav => {
        return (
            <span 
                key={nav.key} 
                className={`item ${activatedRoute === nav.key && 'active'}`} 
                onClick={() => {setActivatedRoute(nav.key)}}
            >
                <img src={ nav.icon } className='center-abs icon-small' alt=''></img>
            </span>
        )
    }) 

    const currentComponent = navItems.find(el => {return el.key === activatedRoute}).component;
    const window = useContext(WindowContext);



    return (
        <div className='lobby-view'>
            {
                window.isMobile ?
                <>
                    <nav className='navigator'>
                        { navElements }
                    </nav>
                    { currentComponent }
                </> :
                <>
                    <div className='desktop-lobby-wrapper'>
                        <LobbyGeneralPanel lobby={ lobby } />
                        <div className='game-list--wrapper'>
                            <GameList />
                        </div>
                    </div>
                </>
            }
            <Chat />
        </div>
    )
}