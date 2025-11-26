function OnlineUsersList({ users, currentUser }) {
  // Function to get initials from username
  const getInitials = (username) => {
    return username.substring(0, 2).toUpperCase();
  };

  // Function to get color based on username
  const getAvatarColor = (username) => {
    const colors = [
      '#00a884', '#0088cc', '#8e44ad', '#e74c3c', 
      '#f39c12', '#16a085', '#27ae60', '#2980b9'
    ];
    const index = username.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="online-users">
      <h3> Online ({users.length})</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index} className={user.username === currentUser ? 'current-user' : ''}>
            <div className="user-avatar" style={{ backgroundColor: getAvatarColor(user.username) }}>
              {getInitials(user.username)}
            </div>
            <span className="user-name">
              {user.username} {user.username === currentUser ? '(You)' : ''}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OnlineUsersList;
