import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from "./pages/SignupPage";
import CoursePage from './pages/CoursesPage';

import About from './pages/About';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';


import BlogPage from './pages/BlogPage'

import CreateBlog from './components/Blogs/CreateBlog';
import UpdateBlog from './components/Blogs/UpdateBlog';




function App() {



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


          <Route path='/showAllBlogs' element={<BlogPage/>}/>
          <Route path='/blog/createBlog' element={<CreateBlog/>} />
          <Route path='/blog/userBlogs' element={<BlogPage/>} />
          <Route path='/blog/updateBlog' element={<UpdateBlog/>} />
          
        </Routes>

    </div>
  );
}

export default App;
