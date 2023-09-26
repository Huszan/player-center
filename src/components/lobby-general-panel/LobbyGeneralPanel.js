import { useContext } from 'react';
import './LobbyGeneralPanel.scss';
import { PopupContext } from '../../utils/PopupManager';
import { copyToClipboard, stringToHslColor } from '../../utils/HelperFunctions';
import { useParams } from 'react-router';
import CopySvg from '../../resources/copy.svg';
import ExpandableBlock from '../expandable-block/ExpandableBlock';
import HorizontalLogo from '../horizontal-logo/HorizontalLogo';

const template = {
    users: [
        {
            id: '1234',
            name: 'Host',
        },
        {
            id: '4321',
            name: 'User',
        },
        {
            id: '2314',
            name: 'User',
        },
    ]
}

export default function LobbyGeneralPanel(props) {
    const popup = useContext(PopupContext);
    const { lobbyId } = useParams();

    const usersElements = template.users.map(user => {
        let userColor = stringToHslColor(user.id);
        return (
            <div className='flex-block' key={user.id}>
                <span className='text-expand' style={{color: `${userColor}`}}><b>{ `${user.name}#${user.id}` }</b></span>
            </div>
        )
    })

    function onCopyId() {
        let message = copyToClipboard(lobbyId);
        message.isSuccess ?
        popup.pop.success(message.content) :
        popup.pop.warning(message.content)
    }

    return (
        <div className='lobby-general-panel'>
            <HorizontalLogo showDesc={ false } />
            <div className='flex-block interactable' onClick={ onCopyId }>
                <span className='text-expand'><b>LobbyID:</b> { lobbyId }</span>
                <img src={ CopySvg } className='icon-small' alt=''></img>
            </div>
            <hr></hr>
            <ExpandableBlock title='Users'>
                {usersElements}
            </ExpandableBlock>
            <hr></hr>
            <ExpandableBlock title='Filter games'>
                Not implemented yet
            </ExpandableBlock>
        </div>
    )
}