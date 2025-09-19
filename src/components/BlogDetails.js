import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function BlogDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then(r => setBlog(r.data))
      .catch(() => nav('/'));
  }, [id, nav]);

  if (!blog) return null;
  return (
    <div>
      <h1>{blog.title}</h1>
      {blog.cardImage && (
        <img src={`${process.env.REACT_APP_API_URL.replace('/api','')}/${blog.cardImage}`} alt="" />
      )}
      <p>By {blog.author.username}</p>
      <div>
        {blog.sections.map((s,i) => (
          <p key={i}>{s.content}</p>
        ))}
      </div>
      <Link to={`/edit/${id}`}>Edit</Link>
      {' | '}
      <button onClick={() => {
        api.delete(`/blogs/${id}`).then(() => nav('/'));
      }}>Delete</button>
    </div>
  );
}