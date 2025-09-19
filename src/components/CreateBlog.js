import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './CreateBlog.css';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [cardImage, setCardImage] = useState(null);
  const [sections, setSections] = useState([{ type: '', content: '' }]);
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

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
    if (!cardImage || sections.length === 0) {
      alert('Image and at least one section are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('card_image', cardImage);
    formData.append('authorId', user.id);
    sections.forEach(s => formData.append('sectionTypes', s.type));
    sections.forEach(s => formData.append('sectionContents', s.content));

    api.post('/blogs', formData)
      .then(() => {
        alert('Blog created successfully');
        nav('/dashboard');
      })
      .catch(() => alert('Failed to create blog'));
  };

  return (
    <div className="create-blog">
      <h2>📝 Create Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />

        <label>Card Image</label>
        <input type="file" accept="image/*" onChange={e => setCardImage(e.target.files[0])} required />

        <label>Author ID</label>
        <input value={user.id} disabled />

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
        <button type="submit" className="btn primary">Submit Blog</button>
      </form>
    </div>
  );
}