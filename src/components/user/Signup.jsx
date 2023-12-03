import React from 'react'
import { useState} from 'react'
import { BiSolidShow , BiSolidHide } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../slices/authSlice';
import { sendOtp } from '../../services/apiLinks/authAPI';

const Signupform = () => {

  const navigate  = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState("Student");
  const [showPassword, setShowPassword] = useState (false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({firstName : "", lastName : "", email : "", password : "", confirmPass : ""})


  function passHandler() {
    setShowPassword (showPassword ? false : true);
  }

  function confirmPassHandler(){
    setShowConfirmPassword (showConfirmPassword ? false : true);
  }

  function changeHandler(event){
    const {name, value} = event.target;
    setFormData((prev) => ({...prev,
                           [name]: value}))
  }

  function submitHandler (event){
    event.preventDefault();
    if (formData.password !== formData.confirmPass){
      toast.error("Password does not match.")
    }
    else{
      const signupData = {
        ...formData,
        accountType
      }

      dispatch(setSignupData(signupData))
      dispatch(sendOtp(formData.email, navigate))
  
      // Reset
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setAccountType("Student")
    }
  }

  return (
    
    <div className='mt-6'>

      <div className='mt-6 mb-2 text-white text-md font-semibold w-fit bg-gray-700 rounded-[2rem] flex'>
        <div onClick={() => setAccountType("Student")} className={`cursor-pointer ${accountType === "Student" ?  'bg-[#192286]' : 'bg-[#03051a]'} rounded-[2rem] py-1.5 px-4 lg:px-7`}>Student</div>
        <div onClick={() => setAccountType("Instructor")} className={`cursor-pointer ${accountType === "Instructor" ? 'bg-[#192286]' : 'bg-[#03051a]'} rounded-[2rem] py-1.5 px-4 lg:px-7`}>Instructor</div>
        <div onClick={() => setAccountType("Alumni")} className={`cursor-pointer ${accountType === "Alumni" ? 'bg-[#192286]' :  'bg-[#03051a]'} rounded-[2rem] py-1.5 px-4`}>Alumni</div>
      </div>

      <form onSubmit={submitHandler} className='flex flex-col w-full mt-4 gap-y-8'>

        <div className='flex gap-5'>
          <label className=' relative '>
          <h2 className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>First Name <sup className='text-red-700 scale-150'>*</sup></h2>
            <input 
              className='bg-gray-700 text-black w-full bg-opacity-60 p-[6px] border-b-[0.05rem] border-opacity-25 rounded-lg'
              type='text'
              name='firstName'
              placeholder='Enter first name'
              value={formData.firstName}
              onChange={changeHandler}
            />
          </label>

          <label className='relative '>
          <h2 className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>Last Name <sup className='text-red-700 scale-150'>*</sup></h2>
            <input 
              className='bg-gray-700 text-black w-full bg-opacity-60 p-[6px] border-b-[0.05rem] border-opacity-25 rounded-lg'
              type='text'
              name='lastName'
              placeholder='Enter last name'
              value={formData.lastName}
              onChange={changeHandler}
            />
          </label>
        </div>
        
        <label className='w-full relative'>
          <h2 className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>Email Address <sup className='text-red-700 scale-150'>*</sup></h2>
          <input 
            className='bg-gray-700 text-black w-full bg-opacity-60 p-[6px] border-b-[0.05rem] border-opacity-25 rounded-lg'
            type='email'
            name='email'
            placeholder='Enter email address'
            value={formData.email}
            onChange={changeHandler}
          />
        </label>
        
        <div className='flex flex-col md:flex-row  gap-5'>
          <label className='w-full relative'>
            <h2 className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>Create Password <sup className='text-red-700 scale-150'>*</sup></h2>
            <input 
              className='bg-gray-700 text-black w-full bg-opacity-60 p-[6px] border-b-[0.05rem] border-opacity-25 rounded-lg'
              type= {showPassword ? ("text") : ("password")}
              name='password'
              placeholder='Enter Password'
              value={formData.password}
              onChange={changeHandler}
            />
            <div className='absolute text-black right-2 bottom-2.5 scale-125'>
              {showPassword ? <BiSolidShow onClick={passHandler}/> : <BiSolidHide onClick={passHandler}/>}
            </div>
          </label>

          
          <label className='w-full relative'>
            <h2 className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>Confirm Password <sup className='text-red-700 scale-150'>*</sup></h2>
            <input
              className='bg-gray-700 text-black w-full bg-opacity-60 p-[6px] border-b-[0.05rem] border-opacity-25 rounded-lg'
              type= {showConfirmPassword ? ("text") : ("password")} 
              name='confirmPass'
              placeholder='Confirm password'
              value={formData.confirmPass}
              onChange={changeHandler}
            />
            <div className='absolute text-black right-2 bottom-2.5 scale-125'>
              {showConfirmPassword ? <BiSolidShow onClick={confirmPassHandler} /> : <BiSolidHide onClick={confirmPassHandler} />}
            </div>
          </label>
        </div>


        <button type='submit' className='w-full p-1.5 my-5 text-black bg-caribbeangreen-400 rounded-[0.55rem] '>
          Create Account
        </button>

      </form>

    </div>
    
  )
}

export default Signupform