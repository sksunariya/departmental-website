import React from 'react'
import Signupform from '../components/user/Signup'

const SignupPage = () => {
  return (
    
    <div className='flex justify-center items-center'>

      <div className='flex flex-col  w-11/12 max-w-[450px]'>

          <h1 className='text-white font-semibold text-[1.65rem] pt-20 leading-[2.375rem]'>Welcome to the <span className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent">Association</span></h1>

          <Signupform/>

      </div>

    </div>

  )
}

export default SignupPage