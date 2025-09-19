import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

export default function AuthorBlogs() {
  const { authorId } = useParams();
  const [list, setList] = useState([]);
  useEffect(() => {
    api.get(`/blogs/author/${authorId}`)
      .then(r => setList(r.data))
      .catch(console.error);
  }, [authorId]);
  return (
    <div>
      <h1>Author {authorId}’s Blogs</h1>
      {list.map(b => (
        <Link key={b.id} to={`/blogs/${b.id}`}>{b.title}</Link>
      ))}
    </div>
  );
}