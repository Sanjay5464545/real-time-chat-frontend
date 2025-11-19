import { useState, useRef } from 'react';

function MessageInput({ onSend, onTyping }) {
  const [message, setMessage] = useState('');
  const typingTimeout = useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
    
    // Typing indicator
    onTyping(true);
    
    // Clear previous timeout
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    
    // Set new timeout to stop typing indicator
    typingTimeout.current = setTimeout(() => {
      onTyping(false);
    }, 2000); // Increased to 2 seconds for better visibility
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
      onTyping(false); // Stop typing when message is sent
      
      // Clear timeout
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-container">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type a message..."
        className="message-input"
      />
      <button type="submit" className="send-btn">Send</button>
    </form>
  );
}

export default MessageInput;
