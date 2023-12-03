import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setUpdateBlog } from '../../slices/blogSlice';
import { deleteBlogApi } from '../../services/apiLinks/blogAPI';
import { setDeleteBlog } from '../../slices/blogSlice';

import { userBlogsApi, showAllBlogs } from '../../services/apiLinks/blogAPI';


const BlogDetails = (blog) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token} = useSelector((state) => state.auth);

    const blogId = blog.blog._id;

    const deleteBlogHandler = () => {
         dispatch(deleteBlogApi(blogId, navigate, token))
         dispatch(setDeleteBlog(blog.blog));
    }

    const {deleteBlog} = useSelector((state) => state.blog);

    useState(() => {
        dispatch (userBlogsApi(navigate, token));
        dispatch (showAllBlogs());
    }, [deleteBlog])
    
    const location = useLocation();
    let userOnly = false;
    if (location.pathname.split('/').includes('userBlogs')){
        userOnly = true;
    }

    
  return (
    <div className='text-white w-11/12 max-w-[670px]'>

        <span className='text-lg font-bold '>{blog.blog.title}</span>

        <p className=' text-white text-sm mt-[4px]'>
            By <span className='italic capitalize'>{blog.blog.creater.firstName} {blog.blog.creater.lastName}</span> on <span>{blog.blog.category}</span>
        </p>
        
        <p className='text-sm mt-[4px]'>Posted on {blog.blog.createdAt}</p>

        <p className='text-md mt-[14px]'>{blog.blog.description}</p>
        
        <div className='flex flex-wrap gap-x-3'>

            {blog.blog.tags.map( (tag, index) => (
                <span key={index} className='text-blue-100 underline font-bold text-xs mt-[5px]'>{`#${tag}`}</span>
            ))}

        </div>

        <div className='flex justify-between'>
        
            { !userOnly && 
                <div className='text-white mt-4 text-sm'>Got some idea, contact creater at: <span className='text-white italic'>{blog.blog.creater.email}</span></div>
            }

            { userOnly && 
                <div className='flex justify-between gap-5 mt-10'>
                    <Link to={'/blog/updateBlog'}>
                        <button onClick={() => dispatch(setUpdateBlog(blog.blog))} className='w-full py-2 px-6 mb-5 text-black bg-caribbeangreen-400 rounded-[0.55rem] '>
                            Edit Blog
                        </button>
                    </Link>
                    
                    
                    <Link to={'/blog/userBlogs'}>
                        <button onClick={() => deleteBlogHandler()}
                             className='w-full py-2 px-6 mb-5 text-black bg-caribbeangreen-400 rounded-[0.55rem] '>
                            Delete Blog
                        </button>
                    </Link>
                </div>
            
            }
        </div>

       

        <div className='w-full h-[0.25px] my-7 rounded-full bg-white'></div>

    </div>
  )
}

export default BlogDetails
