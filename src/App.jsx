import { useState, useEffect } from 'react';
import { socket } from './socket';
import ChatRoom from './components/ChatRoom';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [joined, setJoined] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [tempRoom, setTempRoom] = useState('');

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = (e) => {
    e.preventDefault();
    
    if (tempUsername.trim() && tempRoom.trim()) {
      setUsername(tempUsername);
      setRoom(tempRoom);
      socket.connect();
      socket.emit('joinRoom', { username: tempUsername, room: tempRoom });
      setJoined(true);
    }
  };

  const leaveRoom = () => {
    socket.disconnect();
    setJoined(false);
    setUsername('');
    setRoom('');
    setTempUsername('');
    setTempRoom('');
  };

  if (!joined) {
    return (
      <div className="app-container">
        <div className="join-container">
          <h1>💬 Real-Time Chat App</h1>
          <form onSubmit={joinRoom}>
            <input
              type="text"
              placeholder="Enter your username"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter room name"
              value={tempRoom}
              onChange={(e) => setTempRoom(e.target.value)}
              required
            />
            <button type="submit">Join Room</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <ChatRoom username={username} room={room} onLeave={leaveRoom} />
    </div>
  );
}

export default App;
