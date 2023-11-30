import React from 'react'
import Loginform from '../user/Login'
import Signupform from './Signup'
import frame from '../../assets/Images/frame.png'
import login from '../../assets/Images/login.webp'
import signup from '../../assets/Images/login.webp'
import { FcGoogle } from 'react-icons/fc'


const Template = (props) => {
  return (

    <div className='text-white mx-auto my-8 flex justify-between w-11/12 max-w-[950px]'>

        <div className='flex flex-col w-11/12 max-w-[375px]'>
            <h1 className='font-semibold text-[1.65rem] pb-3 leading-[2.375rem]'>{props.heading}</h1>
            <p className='leading-[1.625] text-[1.125]'>{props.desc1}</p>
            <p className='italic text-blue-100'>{props.desc2}</p>

            <div>
                { props.formType === "signup" ? (<Signupform/>) : (<Loginform/>) }
            </div>

            <div className='flex w-full items-center'>
                <div className='bg-white h-0.5 opacity-25 w-[50%]'></div>
                <p className='px-3 opacity-50 text-[0.875rem]'>OR</p>
                <div className='bg-white h-0.5 opacity-25 w-[50%]'></div>
            </div>

            <button>
                <p className='mt-3 border border-white border-opacity-25 py-1.5 rounded-[8px]'><FcGoogle className='inline scale-125'/><span className='pl-3'>Sign up with Google</span></p>
            </button>

        </div>

        <div className='relative'>
            <img
                src={frame}
                alt='pattern'
                width={410}
                loading='lazy'
                className='relative'
            />

            { props.formType !== "signup" &&
                <img
                    src={login}
                    alt='loginimg'
                    width={405}
                    loading='lazy'
                    className='absolute top-0 left-0'
                />
            }

            {props.formType === "signup" && 
                <img
                    src={signup}
                    alt='signupimg'
                    width={405}
                    height={540}
                    loading='lazy'
                    className='absolute top-0 left-0'
                />
            }

        </div>

    </div>

  )
}

export default Template