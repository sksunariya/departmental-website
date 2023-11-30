import React, { useContext } from 'react'
import BlogHeader from './BlogHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import BlogPosts from './BlogPosts'
import BlogFooter from './BlogFooter'
import { AppContext } from '../../services/apiLinks/blogsAPI'

const CategoryPage = () => {

    const {posts} = useContext(AppContext);
    const navigation = useNavigate();
    const location = useLocation();
    const category = location.pathname.split('/').at(-1);

  return (
    <div className='w-full text-white h-full flex flex-col gap-y-1 justify-center items-center'>
        <BlogHeader/>
        <div className='mt-[70px] w-11/12 max-w-[670px] flex gap-10'>
            <div>
                <button className='px-2 py-1 justify-items-start border-2 rounded-md' onClick={() => navigation(-1)}>
                    Back
                </button>
            </div>
            <h2>
                Blogs Tagged <span className='font-bold underline'> #{category}</span>
            </h2>
        </div>
        <BlogPosts/>
        {
            posts.length === 0 ? (<div></div>) : (<BlogFooter/>)
        }
    </div>
  )
}

export default CategoryPage