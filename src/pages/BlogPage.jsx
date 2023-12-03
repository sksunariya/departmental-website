
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import BlogPosts from '../components/Blogs/BlogPosts';
import { showAllBlogs, userBlogsApi } from '../services/apiLinks/blogAPI';


function BlogPage({}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {token} = useSelector((state) => state.auth);
  const {allBlogs, userBlogs, deleteBlog} = useSelector((state) => state.blog);

  const location = useLocation();
  let userOnly = false;

  if (location.pathname.split('/').includes('userBlogs')){
    userOnly = true;
  }
  
  useState( () => {
    dispatch (userOnly ? userBlogsApi(navigate, token) : showAllBlogs());
  },[allBlogs, userBlogs, deleteBlog]);


  return (

    <div className='flex justify-center items-center'>
      <BlogPosts />
    </div>
    


  );
}

export default BlogPage;
