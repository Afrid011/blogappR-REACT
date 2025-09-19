import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './CreatorDashboard.css';

export default function CreatorDashboard() {
  const [blogs, setBlogs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.id) {
      api.get(`/blogs/author/${user.id}`)
        .then(res => setBlogs(res.data))
        .catch(console.error);
    }
  }, [user]);

  const deleteBlog = id => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      api.delete(`/blogs/${id}`)
        .then(() => {
          setBlogs(prev => prev.filter(b => b.id !== id));
        })
        .catch(() => alert('Failed to delete blog'));
    }
  };

  return (
    <div className="creator-dashboard">
      <h2>📚 Creator Dashboard</h2>
      <Link to="/create" className="btn primary">+ Create Blog</Link>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>
                  <Link to={`/view/${blog.id}`} className="btn info">View</Link>
                  <Link to={`/edit/${blog.id}`} className="btn warning">Edit</Link>
                  <button onClick={() => deleteBlog(blog.id)} className="btn danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}