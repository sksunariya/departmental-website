import React from 'react'
import { useState} from 'react'
import { BiSolidShow , BiSolidHide } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {login} from '../../services/apiLinks/authAPI';

function Loginform () {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState( { email : "", password : "" } );

  function submitHandler (event){
    event.preventDefault();
    // console.log(formData.email, formData.password);
    dispatch(login(formData.email, formData.password, navigate));
  }

  function changeHandler(event){
    const {name, value} = event.target;
    setFormData( (prev) => ({...prev, [name] : value}));
  }

  function showHandler (){
    if (showPassword) {
      setShowPassword(false);
    }
    else{
      setShowPassword(true);
    }
  }

  return (
    
    <div>

        <form onSubmit={submitHandler}
          className='flex flex-col w-full mt-6 gap-y-6'>

          <label className='w-full'>
            <h2 className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>
              Email address <sup className=' text-pink-200'>*</sup>
            </h2>
            <input
              className='bg-gray-700 text-black w-full bg-opacity-60 p-[6px] border-b-[0.05rem] border-opacity-25 rounded-lg'
              type='email'
              name='email'
              placeholder='Enter email address'
              value={formData.email}
              onChange={changeHandler}
              spellCheck={false}
            />
          </label>

          <label className='w-full relative'>
            <h2 className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>Password <sup className=' text-pink-200 scale-150'>*</sup></h2>

            <input
              className='bg-gray-700 text-black w-full bg-opacity-60 p-[6px] border-b-[0.05rem] border-opacity-25 rounded-lg'
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Enter Password'
              value={formData.password}
              onChange={changeHandler}
            />
            <div className='absolute text-black right-3 bottom-2.5 scale-125'>
              {showPassword ? (<BiSolidShow onClick={showHandler}/>) : (<BiSolidHide onClick={showHandler}/>)}
            </div>
            
          </label>

          <Link to="/forgotPassword">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
              Forgot Password
            </p>
          </Link>


          <button type='submit' className='w-full p-1.5 mb-5 text-black bg-yellow-500 rounded-[0.55rem] '>
            Log In
          </button>

        </form>

    </div>

  )
}

export default Loginform;