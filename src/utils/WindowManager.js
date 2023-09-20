import { createContext } from "react";
import { useEffect, useState } from 'react';

export const WindowContext = createContext();

function setRootWindowStyle() {
  if (window.innerWidth > 600) document.getElementById('root').classList.add('desktop');
  else document.getElementById('root').classList.remove('desktop');
}

export default function WindowManager(props) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    function init() {
      setIsMobile(window.innerWidth <= 600);
      setRootWindowStyle();
    }

    useEffect(() => {
      init();
      const isMobileSub = window.addEventListener('resize', () => {
        init();
      })
      return () => {
        window.removeEventListener('resize', isMobileSub);
      }
    })

    return (
        <WindowContext.Provider
            value = {{
                isMobile
            }}
        >
            { props.children }
        </WindowContext.Provider>
    )
}