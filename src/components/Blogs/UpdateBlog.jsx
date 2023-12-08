import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateBlogApi } from '../../services/apiLinks/blogAPI';

const UpdateBlog = () => {

    const {token}  = useSelector((state) => state.auth);
    const {updateBlog} = useSelector((state) => state.blog);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({title:`${updateBlog.title}`, description:`${updateBlog.description}`, category: `${updateBlog.category}` , tags: `${updateBlog.tags}`})

    function changeHandler (event) {
        const {name, value} = event.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateBlogApi(formData.title, formData.description, formData.category, formData.tags, updateBlog._id, navigate, token))
    }


  return (
    <div className='text-white flex justify-center items-center gap-10'>

        <form onSubmit={submitHandler} className='my-10 border-[1px] border-white border-opacity-40 rounded-lg mx-5 md:py-16 md:px-10 lg:px-16 max-w-3xl w-11/12 flex flex-col gap-10'>

            <h1 className='text-white font-bold  text-4xl'>Publish Your  <span className="bg-gradient-to-b from-[#1f75ff] via-[#12D8FA] to-[#1f2f25] text-transparent bg-clip-text font-bold">Thoughts </span> in your way</h1>

            <label className='w-full'>
                <h2 className='text-white mb-2 ml-1 text-lg'>Title <sup className=' text-pink-200'>*</sup></h2>

                <input className='text-white w-full focus:outline-none label-shadow bg-richblack-600 py-3 px-6 border-b-2 border-opacity-30 shadow-lg p-[6px] border-white rounded-lg'
                    type='text'
                    name='title'
                    placeholder='Enter Title of your blog'
                    onChange={changeHandler}
                    value={formData.title}
                    spellCheck={false}
                />

            </label>  


            
            <label className='w-full'>
                <h2 className='text-white mb-2 ml-1 text-lg'>Category of Your Blog</h2>

                <input className=' bg-richblack-500 py-3 px-6 text-white w-full  focus:outline-none label-shadow bg-opacity-60 p-[6px] border-b-[0.05rem] border-opacity-25 rounded-lg'
                    type='text'
                    name='category'
                    placeholder='Enter Category of Blog'
                    onChange={changeHandler}
                    value={formData.category}
                    spellCheck={false}
                />

            </label>


            <label className='w-full'>
                <h2 className='text-white mb-1 ml-1 text-lg'>Tags of Your Blog <span className='text-sm'>(keep space between two tags, No need to keep # sign)</span> </h2>

                <input className=' bg-richblack-500 py-3 px-6 focus:outline-none label-shadow text-white w-full bg-opacity-60 p-[6px] border-b-[0.05rem] border-opacity-25 rounded-lg'
                    type='text'
                    name='tags'
                    placeholder='Enter Tags'
                    onChange={changeHandler}
                    value={formData.tags}
                    spellCheck={false}
                />

            </label>


            <label className='w-full'>
                <h2 className='text-white mb-1 ml-1 text-lg'>Description <sup className=' text-pink-200'>*</sup></h2>

                <textarea className=' bg-richblack-500 text-white py-3 px-6  focus:outline-none label-shadow w-full bg-opacity-60 p-[6px] border-b-[0.05rem] border-opacity-25 rounded-lg'
                    type='text'
                    name='description'
                    cols="30"
                    rows="7"
                    placeholder='Enter description'
                    onChange={changeHandler}
                    value={formData.description}
                    spellCheck={false}
                />

            </label>




            <button type='submit' className='w-full py-3 px-6 mb-5 text-black bg-caribbeangreen-400 rounded-[0.55rem] '>
                Update Blog
            </button>

        </form>

    </div>
  )
}

export default UpdateBlog