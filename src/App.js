import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from "./pages/SignupPage";
import CoursePage from './pages/CoursesPage';
import Footer from './components/common/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';


import BlogPage from './pages/BlogPage'

import BlogHome from './components/Blogs/BlogHome';
import ShowBlogs from './components/Blogs/ShowBlogs';
import TagPage from './components/Blogs/TagPage';
import CategoryPage from './components/Blogs/CategoryPage';
import { AppContext } from './services/apiLinks/blogsAPI';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';




function App() {



  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    const page = searchParams.get("page") ?? 1;

    if (location.pathname.includes('tags')){
      const tag = location.pathname.split('/').at(-1).replace('-', ' ');
      fetchBlogPosts(Number(page), tag);
    }
    else if (location.pathname.includes('categories')){
      const category = location.pathname.split('/').at(-1);
      fetchBlogPosts(Number(page), null, category);
    }
    else{
      fetchBlogPosts(Number(page));
    }

  },[location.pathname, location.search])



  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar/>
        <Routes>

          <Route path="/" element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/courses' element={<CoursePage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/verify-email' element={<VerifyEmail/>}/>
          <Route path='/dashboard/my-profile' element={<Dashboard/>}/>


          
          {/* <Route path='/blogs' element={<BlogPage/>}/> */}

          <Route path='/blogs' element={<ShowBlogs/>} />
          <Route path='/blog/:blogId' element={<BlogHome/>} />
          <Route path='/tags/:tag' element={<TagPage/>} />
          <Route path='/categories/:category' element={<CategoryPage/>} />

          
        </Routes>

    </div>
  );
}

export default App;
