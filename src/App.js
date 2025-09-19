import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './components/Home';
import BlogDetails from './components/BlogDetails';
import AuthorBlogs from './components/AuthorBlogs';
import CreateBlog from './components/CreateBlog';
import EditBlog from './components/EditBlog';
import Login from './components/Login';
import RegisterCreator from './components/RegisterCreator';
import UpdatePassword from './components/UpdatePassword';
import UserList from './components/UserList';
import CreatorList from './components/CreatorList';
import CreatorDashboard from './components/CreatorDashboard';
import AdminDashboard from './components/AdminDashboard';
import ViewBlog from './components/ViewBlog';
import './App.css';

function App() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    nav('/login');
  };

  return (
    <div className="app">
      <header>
        <h1>📝 BlogAppR</h1>
        <nav>
          {!user && <Link to="/login">Login</Link>}
          {user?.role === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
          {user?.role === 'creator' && <Link to="/dashboard">Creator Dashboard</Link>}
          {user?.role === 'creator' && <Link to="/create">Add Blog</Link>}
          {user?.role === 'admin' && (
            <>
              <Link to="/users">Users</Link>
              <Link to="/creators">Creators</Link>
              <Link to="/register">Add Creator</Link>
            </>
          )}
          {user && <button onClick={logout} className="logout">Logout</button>}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Login />} />
          <Route path="/dashboard" element={user?.role === 'creator' ? <CreatorDashboard /> : <Login />} />
          <Route path="/create" element={user?.role === 'creator' ? <CreateBlog /> : <Login />} />
          <Route path="/edit/:id" element={user?.role === 'creator' ? <EditBlog /> : <Login />} />
          <Route path="/view/:id" element={<ViewBlog />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/author/:authorId" element={<AuthorBlogs />} />
          <Route path="/register" element={user?.role === 'admin' ? <RegisterCreator /> : <Login />} />
          <Route path="/password/:id" element={user?.role === 'admin' ? <UpdatePassword /> : <Login />} />
          <Route path="/users" element={user?.role === 'admin' ? <UserList /> : <Login />} />
          <Route path="/creators" element={user?.role === 'admin' ? <CreatorList /> : <Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;