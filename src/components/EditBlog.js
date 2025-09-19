import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import './EditBlog.css';

export default function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [cardImage, setCardImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [sections, setSections] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then(res => {
        const blog = res.data;
        setTitle(blog.title);
        setPreview(blog.cardImage);
        setSections(blog.sections || []);
      })
      .catch(() => alert('Failed to load blog'));
  }, [id]);

  const handleSectionChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const addSection = () => {
    setSections([...sections, { type: '', content: '' }]);
  };

  const removeSection = index => {
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    if (cardImage) formData.append('card_image', cardImage);
    sections.forEach(s => formData.append('sectionTypes', s.type));
    sections.forEach(s => formData.append('sectionContents', s.content));

    api.put(`/blogs/${id}`, formData)
      .then(() => {
        alert('Blog updated successfully');
        nav('/dashboard');
      })
      .catch(() => alert('Failed to update blog'));
  };

  return (
    <div className="edit-blog">
      <h2>✏️ Edit Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />

        <label>Card Image</label>
        {preview && <img src={`https://blogappr-api-1.onrender.com/${preview}`} alt="Preview" className="preview" />}
        <input type="file" accept="image/*" onChange={e => setCardImage(e.target.files[0])} />

        <h3>Sections</h3>
        {sections.map((s, i) => (
          <div key={i} className="section-block">
            <input
              placeholder="Heading"
              value={s.type}
              onChange={e => handleSectionChange(i, 'type', e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              value={s.content}
              onChange={e => handleSectionChange(i, 'content', e.target.value)}
              required
            />
            {sections.length > 1 && (
              <button type="button" onClick={() => removeSection(i)} className="btn danger">Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addSection} className="btn info">+ Add Section</button>
        <button type="submit" className="btn primary">Update Blog</button>
      </form>
    </div>
  );
}