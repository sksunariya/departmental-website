import React from 'react'
import Loginform from '../components/user/Login'

const Login = () => {
  return (
    <div className='flex justify-center items-center'>

      <div className='flex flex-col  w-11/12 max-w-[450px]'>

          <h1 className='text-white font-semibold text-[1.65rem] pt-20 leading-[2.375rem]'>Welcome Back</h1>

          <Loginform/>

      </div>

    </div>

  )
}

export default Login