import { useState } from 'react';
import api from '../api';

export default function RegisterCreator() {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const handle = e => {
    e.preventDefault();
    api.post('/users/creator', null, { params: { username:u, password:p } })
       .then(r => console.log('Creator added', r.data))
       .catch(console.error);
  };
  return (
    <form onSubmit={handle}>
      <h1>Add Creator</h1>
      <input value={u} onChange={e=>setU(e.target.value)} placeholder="Username" required/>
      <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="Password" required/>
      <button>Create</button>
    </form>
  );
}