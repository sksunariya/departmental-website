import React, { useContext } from 'react'
import { AppContext } from '../../services/apiLinks/blogsAPI'
import BlogLoading from './BlogLoading';
import BlogDetails from './BlogDetails';

const BlogPosts = () => {

    const { loading, posts } = useContext(AppContext);

  return (
    <div className='min-h-screen w-11/12 max-w-[670px] py-8 flex flex-col gap-y-7 mb-[50px]'>
        {
            loading ?

            (<BlogLoading/>) :

            (
                posts.length === 0 ?
                (<div className='mt-[100px] w-full flex justify-center items-center'>
                    <p className='text-lg text-white font-bold'>No Post Found</p>
                </div>)  :
                (posts.map ((post,index) => (
                    <div>
                        <BlogDetails key={index} post={post}/>
                        <div className='w-1 h-full bg-white'></div>
                    </div>
                    
                )))
            )
        }
    </div>
  )
}

export default BlogPosts