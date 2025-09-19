import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './ViewBlog.css';

export default function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(() => alert('Failed to load blog'));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="view-blog">
      <h1>{blog.title}</h1>
      {blog.cardImage && (
        <img
          src={`https://blogappr-api-1.onrender.com/${blog.cardImage}`}
          alt="Card"
          className="card-image"
        />
      )}
      <div className="sections">
        {blog.sections.map((s, i) => (
          <div key={i} className="section">
            <h3>{s.type}</h3>
            <p>{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}