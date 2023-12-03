import React, { useState } from 'react'
import BlogLoading from './BlogLoading';
import BlogDetails from './BlogDetails';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const BlogPosts = () => {

    const location = useLocation();

    const {allBlogs, userBlogs, loading} = useSelector((state) => state.blog);

    let blogs = (location.pathname.split('/').includes('userBlogs')) ? userBlogs : allBlogs;

    useState( () => {
        blogs = (location.pathname.split('/').includes('userBlogs')) ? userBlogs : allBlogs; 
    })
    

  return (
    <div className='min-h-screen w-11/12 max-w-[670px] py-8 flex flex-col gap-y-7 mb-[50px]'>
        {
            loading ?

            (<BlogLoading/>) :

            (
                blogs ? blogs.length === 0 ?
                (<div className='mt-[100px] w-full flex justify-center items-center'>
                    <p className='text-lg text-white font-bold'>No Blogs Found</p>
                </div>)  :
                (blogs.map ((blog,index) => (
                    <div>
                        <BlogDetails key={index} blog={blog}/>
                        <div className='w-1 h-full bg-white'></div>
                    </div>
                    
                ))) :
                (<div className='mt-[100px] w-full flex justify-center items-center'>
                    <p className='text-lg text-white font-bold'>No Blogs Found</p>
                </div>)
            )
        }
    </div>
  )
}

export default BlogPosts