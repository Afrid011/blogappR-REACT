import { useState, useEffect } from 'react';
import api from '../api';

export default function CreatorList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    api.get('/users/creators').then(r => setList(r.data)).catch(console.error);
  }, []);
  return (
    <div>
      <h1>All Creators</h1>
      {list.map(u => <div key={u.id}>{u.username}</div>)}
    </div>
  );
}