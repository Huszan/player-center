// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, addDoc, setDoc, onSnapshot, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk9X_Oxf_-0EPQPxuR8ERXPks6CjboF1g",
  authDomain: "player-center-41c8c.firebaseapp.com",
  projectId: "player-center-41c8c",
  storageBucket: "player-center-41c8c.appspot.com",
  messagingSenderId: "672732243152",
  appId: "1:672732243152:web:cd6a5e2ddefeb234beaad5",
  measurementId: "G-ZH8H4V33CP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore functions
// TODO: move firestore and it's functions to separate files
function createLobby(user) {
  return addDoc(collection(db, "lobby"), {
    hostId: user.id,
    users: [],
  })
}

function getLobby(lobbyId) {
  return new Promise((res, rej) => {
    getDoc(doc(db, "lobby", lobbyId)).then(snapshot => {
      if (snapshot.exists()) {
        res(snapshot.data());
      } else {
        rej("Lobby with given id doesn't exist");
      }
    });
  })
}

function joinLobby(lobbyId, user) {
  return new Promise((res, rej) => {
    getLobby(lobbyId).then(
      (lobby) => {
        if (lobby.users.filter(u => u.id === user.id).length > 0) {
          res(lobby);
          return;
        }
        setDoc(
          doc(db, "lobby", lobbyId), 
          {
            users: [
              ...lobby.users,
              user
            ]
          },
          { merge: true }
        ).then(() => {
          res(lobby);
        })
      },
      (lobbyRej) => rej(lobbyRej)
    )
  })
}

function leaveLobby(lobbyId, user) {
  getLobby(lobbyId).then(
    (lobby) => {
      if (lobby.users.filter(u => u.id === user.id).length > 0) {
        const newUsers = lobby.users.filter(u => u.id !== user.id);
        lobby.users = newUsers;
        setDoc(doc(db, "lobby", lobbyId), lobby);
      }
    },
  )
}

function subscribeToLobby(lobbyId, onDataChange = () => {}) {
  return onSnapshot(doc(db, "lobby", lobbyId), (snapshot) => {
    onDataChange(snapshot);
  })
}

export { createLobby, getLobby, joinLobby, leaveLobby, subscribeToLobby };

