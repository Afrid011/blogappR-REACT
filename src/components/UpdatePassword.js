import { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function UpdatePassword() {
  const { id } = useParams();
  const [p, setP] = useState('');
  const handle = e => {
    e.preventDefault();
    api.put(`/users/${id}/password`, null, { params: { newPassword:p } })
       .then(() => console.log('Password updated'))
       .catch(console.error);
  };
  return (
    <form onSubmit={handle}>
      <h1>Update Password</h1>
      <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="New Password" required/>
      <button>Update</button>
    </form>
  );
}