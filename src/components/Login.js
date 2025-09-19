import { useState } from 'react';
import api from '../api';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/users/login', null, {
        params: { username, password }
      });

      console.log('✅ Login response:', res.data);
      const user = res.data;

      if (!user || !user.role) {
        alert('Login failed: invalid response');
        return;
      }

      // Save user data
      localStorage.setItem('user', JSON.stringify(user));

      // 🔁 Hard redirect to correct dashboard
      if (user.role === 'admin') {
        window.location.href = '/admin';
      } else if (user.role === 'creator') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/';
      }

    } catch (err) {
      console.error('❌ Login error:', err);
      alert('Invalid credentials or server error');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>🔐 Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}