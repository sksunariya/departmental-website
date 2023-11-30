import React from 'react'
import BlogPosts from './BlogPosts'
import BlogHeader from './BlogHeader'
import BlogFooter from './BlogFooter'

const ShowBlogs = () => {
  return (
    <div className=' text-white w-full h-full flex flex-col gap-y-1 justify-center items-center'>
        <BlogHeader/>
        <BlogPosts/>
        <BlogFooter/>
    </div>
  )
}

export default ShowBlogs