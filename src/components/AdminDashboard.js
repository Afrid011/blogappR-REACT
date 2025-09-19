import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [creators, setCreators] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = () => {
    api.get('/users/creators')
      .then(r => setCreators(r.data))
      .catch(console.error);
  };

  const addCreator = e => {
    e.preventDefault();
    setLoading(true);
    api.post('/users/creator', null, {
      params: { username, password }
    })
    .then(() => {
      setUsername('');
      setPassword('');
      fetchCreators();
      setLoading(false);
      alert(`Creator "${username}" added successfully`);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
      alert('Failed to add creator');
    });
  };

  return (
    <div className="admin-dashboard">
      <h2>👑 Admin Dashboard</h2>

      <form onSubmit={addCreator} className="creator-form">
        <label>Username</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Creator'}
        </button>
      </form>

      <h3>Content Creators</h3>
      {creators.length === 0 ? (
        <p>No creators found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {creators.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.username}</td>
                <td>
                  <Link to={`/password/${c.id}`} className="btn warning">Edit Password</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}