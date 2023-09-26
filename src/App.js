import './App.scss';
import PopupManager from './utils/PopupManager';
import PopupOverlay from './components/popup-overlay/PopupOverlay';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WindowManager from './utils/WindowManager';
import WelcomeView from './components/views/welcome-view/WelcomeView';
import HostForm from './components/host-form/HostForm';
import JoinForm from './components/join-form/JoinForm';
import LobbyView from './components/views/lobby-view/LobbyView';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomeView />,
      children: [
        {
          path: "host",
          element: <HostForm />
        },
        {
          path: "join",
          element: <JoinForm />
        },
      ]
    },
    {
      path: "lobby/:lobbyId",
      element: <LobbyView />
    },
  ])

  return (
    <PopupManager>
      <WindowManager>
        <div className='App'>
          <PopupOverlay />
          <main>
              <RouterProvider router={router} />
          </main>
        </div>
      </WindowManager>
    </PopupManager>
  );
}

export default App;
