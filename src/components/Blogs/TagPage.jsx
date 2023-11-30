import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BlogHeader from './BlogHeader';
import BlogPosts from './BlogPosts';
import BlogFooter from './BlogFooter';

const TagPage = () => {

    const navigation = useNavigate();
    const location = useLocation();
    const tag = location.pathname.split('/').at(-1);

  return (
    <div className=' text-white w-full h-full flex flex-col gap-y-1 justify-center items-center'>
        <BlogHeader/>
        <div className='mt-[70px] w-11/12 max-w-[670px] gap-10 flex'>
            <div>
            <button className='px-2 py-1 border-2 rounded-md' onClick={() => navigation(-1)}>
                Back
            </button>
            </div>
            <h2>
                Blogs Tagged <span className='font-bold underline'> #{tag}</span>
            </h2>
        </div>
        <BlogPosts/>
        <BlogFooter/>
    </div>
  )
}

export default TagPage