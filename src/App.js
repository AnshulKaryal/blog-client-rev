import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './pages/Loign';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';
import MyBlog from './pages/MyBlog';
import { Toaster } from 'react-hot-toast';
import UpdateBlog from './pages/UpdateBlog';
import Home from './pages/Home';
import UserBlogs from './pages/UserBlogs';
import ViewBlog from './pages/ViewBlog';

function App() {
  return (
    <>
      <Header/>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/my-blogs" element={<MyBlog />} />
        <Route path="/view-blog/:id" element={<ViewBlog />} />
        <Route path="/update-blog/:id" element={<UpdateBlog />} />
        <Route path="/user-blogs/:userId" element={<UserBlogs />} />
      </Routes>
    </>
  );
}

export default App;
