import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    api.get('/blogs').then(r => setBlogs(r.data)).catch(console.error);
  }, []);
  return (
    <div>
      <h1>All Blogs</h1>
      {blogs.map(b => (
        <div key={b.id}>
          <Link to={`/blogs/${b.id}`}>{b.title}</Link> by{' '}
          <Link to={`/author/${b.authorId}`}>{b.authorName}</Link>
        </div>
      ))}
    </div>
  );
}