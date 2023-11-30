import React from 'react'
import { NavLink } from 'react-router-dom'

const BlogDetails = (post) => {
    console.log ("Post: ")
    console.log(post);
  return (
    <div className='text-white'>
        <NavLink to={`/blog/${post.post.id}`}>
            <span className='text-lg font-bold '>{post.post.title}</span>
        </NavLink>
        <p className=' text-white text-sm mt-[4px]'>
            By <span className='italic'>{post.post.author}</span> on {" "} 
            <NavLink to={`/categories/${post.post.category.replaceAll(" ", "-")}`}>
                <span>{post.post.category}</span>
            </NavLink>
        </p>
        <p className='text-sm mt-[4px]'>Posted on {post.post.date}</p>
        <p className='text-md mt-[14px]'>{post.post.content}</p>
        <div className='flex flex-wrap gap-x-3'>
            {post.post.tags.map( (tag,index) => (
                <NavLink key={index} to={`/tags/${tag.replaceAll(" ","-")}`}>
                    <span className='text-blue-100 underline font-bold text-xs mt-[5px]'>{`#${tag}`}</span>
                </NavLink>
            ))}
        </div>
    </div>
  )
}

export default BlogDetails
