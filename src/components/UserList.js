import { useState, useEffect } from 'react';
import api from '../api';

export default function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get('/users').then(r => setUsers(r.data)).catch(console.error);
  }, []);
  return (
    <div>
      <h1>All Users</h1>
      {users.map(u => <div key={u.id}>{u.username} ({u.role})</div>)}
    </div>
  );
}