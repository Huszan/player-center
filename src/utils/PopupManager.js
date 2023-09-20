import { createContext, useState } from 'react';
import uniqid from 'uniqid';

export const PopupContext = createContext(null);

export default function PopupManager(props) {
    let [popups, setPopups] = useState({});

    function removePopup(key) {
        setPopups(prev => {
            const clone = {...prev};
            delete clone[`${key}`];
            return clone;
        })
    }

    function addPopup(content, type, t) {
        const popup = {
            key: uniqid(),
            content: content,
            type: type,
        }
        setPopups(prev => {
            return {
                ...prev,
                [popup.key]: popup
            }
        })
        setTimeout(() => removePopup(popup.key), t);
    }

    const pop = {
        success: (content, t = 5000) => addPopup(content, 'success', t),
        info: (content, t = 5000) => addPopup(content, 'info', t),
        warning: (content, t = 5000) => addPopup(content, 'warning', t),
    }

    return (
        <PopupContext.Provider
            value = {{
                popups,
                pop,
                removePopup
            }}
        >
            { props.children }
        </PopupContext.Provider>
    )
}