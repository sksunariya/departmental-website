import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link , matchPath, useLocation} from 'react-router-dom';
import {AiOutlineMenu} from 'react-icons/ai';


const Navbar = () => {

        
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const location = useLocation();

    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userImage, setUserImage] = useState("");

    useEffect(() => {
      setUserFirstName(user?.firstName);
      setUserLastName(user?.lastName);
      setUserImage(user?.image);
    
    }, [user]);


    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname);
    }


  return (

    <div>
        
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800 transition-all duration-200'>

        <div className="flex w-11/12 max-w-maxContent items-center justify-between">

            <Link to="/">
                <h1 className=' text-2xl bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>CodeCraft</h1>
            </Link>

            <nav className="hidden md:block">
                <ul className="flex gap-x-6 text-richblack-25">

                        <Link to={'/'}>
                            <p className={`${matchRoute('/')? "text-yellow-25": "text-richblack-25" }`}> Home </p>
                        </Link>

                        <Link to={'/blogs'}>
                            <p className={`${matchRoute('/blogs')? "text-yellow-25": "text-richblack-25" }`}> Activities </p>
                        </Link>

                        <Link to={'/courses'}>
                            <p className={`${matchRoute('/courses')? "text-yellow-25": "text-richblack-25" }`}> Courses </p>
                        </Link>
                        
                        <Link to={'/about'}>
                            <p className={`${matchRoute('/about')? "text-yellow-25": "text-richblack-25" }`}> About Us </p>
                        </Link>
                        
                        <Link to={'/contact'}>
                            <p className={`${matchRoute('/contact')? "text-yellow-25": "text-richblack-25" }`}> Contact Us </p>
                        </Link>

                </ul>
            </nav>

            <div className="hidden items-center gap-x-4 md:flex">

            {token === null && (
                <Link to="/login">
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                        Log in
                    </button>
                </Link>
            )}
            {token === null && (
                <Link to="/signup">
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                        Sign up
                    </button>
                </Link>
            )}
            {token !== null && 
                <Link to={'/dashboard/my-profile'}>
                    <div className='flex gap-6 items-center'>
                    
                        <div className='text-lg text-white'>
                            {userFirstName} {userLastName}
                        </div>
                        
                        <img width={30} height={30} className='rounded-full' src={userImage} alt='profile-picture'/>
                        
                    </div>
                </Link>
            }
            </div>
            <button className="mr-4 md:hidden">
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            </button>
        </div>
        </div>

    </div>
  )
}

export default Navbar