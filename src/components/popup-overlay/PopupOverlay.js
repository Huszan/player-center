import { useContext } from 'react';
import './PopupOverlay.scss';
import { PopupContext } from '../../utils/PopupManager';

export default function PopupOverlay() {
    let popupContext = useContext(PopupContext);

    function removePopup(key) {
        popupContext.removePopup(key);
    }

    const popupElements = Object.values(popupContext.popups).map((popup) => {
        return (
            <div 
                className={`popup-wrapper ${popup.type} noselect`} 
                key={popup.key}
                onClick={() => removePopup(popup.key)}
            >
                { popup.content }
            </div>
        )
    })

    return (
        <div id='popup-overlay'>
            {popupElements}
        </div>
    )
}