import { useState, useEffect } from 'react';
import axios from 'axios';

export function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://deep-dream-backend.onrender.com/api/user/:id', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (!user) {
    return (
      <div>
        <h1>Please login to view your profile</h1>
        <a href="/signin">Login</a>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Your email is: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;