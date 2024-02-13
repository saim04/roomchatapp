import { useRef, useState } from "react";
import "./App.css";
import { Auth } from "./Components/Auth";
import Cookies from "universal-cookie/cjs/Cookies";
import { useFirebase } from "./Context/Firebase";
import { Chat } from "./Components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./fconfig";

const cookies = new Cookies();
function App() {
  const { isAuth, signUserOut } = useFirebase();
  const [room, setRoom] = useState(null);
  const roomRef = useRef(null);
  if (!isAuth) {
    return (
      <div className="App">
        <Auth />
      </div>
    );
  }

  return (
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div>
          <label>Enter Room Name</label>
          <input ref={roomRef} />
          <button onClick={() => setRoom(roomRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
      <div>
        <button onClick={() => signUserOut(setRoom)}>Signout</button>
      </div>
    </div>
  );
}

export default App;
