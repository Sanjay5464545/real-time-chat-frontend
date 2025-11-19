function TypingIndicator({ typingUsers }) {
  // Remove duplicates
  const uniqueUsers = [...new Set(typingUsers)];
  
  if (uniqueUsers.length === 0) return null;

  return (
    <div className="typing-indicator">
      {uniqueUsers.length === 1 ? (
        <span>{uniqueUsers[0]} is typing...</span>
      ) : uniqueUsers.length === 2 ? (
        <span>{uniqueUsers[0]} and {uniqueUsers[1]} are typing...</span>
      ) : (
        <span>{uniqueUsers.length} people are typing...</span>
      )}
    </div>
  );
}

export default TypingIndicator;
