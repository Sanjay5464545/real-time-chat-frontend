import { useEffect, useState } from 'react';
import { socket } from '../socket';
import MessageInput from './MessageInput';
import OnlineUsersList from './OnlineUsersList';
import TypingIndicator from './TypingIndicator';

function ChatRoom({ username, room, onLeave }) {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.emit('joinRoom', { username, room });

    socket.on('chatHistory', (history) => {
      setMessages(history);
    });

    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    socket.on('userTyping', ({ username, isTyping }) => {
      setTypingUsers((prev) =>
        isTyping ? [...prev, username] : prev.filter((u) => u !== username)
      );
    });

    return () => {
      socket.off('chatHistory');
      socket.off('message');
      socket.off('onlineUsers');
      socket.off('userTyping');
    };
  }, [username, room]);

  const handleSendMessage = (message) => {
    socket.emit('sendMessage', { username, room, message });
  };

  const handleTyping = (isTyping) => {
    socket.emit('typing', { username, room, isTyping });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div>
          <h2>Room: {room}</h2>
          <p>Welcome, {username}! 👋</p>
        </div>
        <button onClick={onLeave} className="leave-btn">Leave Room</button>
      </div>

      <div className="chat-main">
        <div className="messages-container">
          <div className="messages-list">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.username === username ? 'own-message' : ''} ${msg.isSystem || msg.username === 'System' ? 'system-message' : ''}`}
              >
                {msg.isSystem ? (
                  <>
                    {msg.message}
                    <span className="timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </>
                ) : (
                  <>
                    <strong>{msg.username}:</strong> {msg.message}
                    <span className="timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
          <TypingIndicator typingUsers={typingUsers} />
          <MessageInput onSend={handleSendMessage} onTyping={handleTyping} />
        </div>
        <OnlineUsersList users={onlineUsers} currentUser={username} />
      </div>
    </div>
  );
}

export default ChatRoom;
