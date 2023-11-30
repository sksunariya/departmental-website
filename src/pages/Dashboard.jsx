import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { logout } from "../services/apiLinks/authAPI"

import ButtonComp from "../components/HomePage/Button"

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const {user } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative w-11/12 max-w-7xl">
      { user &&
      <button onClick={() => dispatch(logout(navigate))} className="absolute pl-6 rounded-md top-2 pr-8 py-2 -right-28 border text-lg font-lg text-richblack-300">
        <div className="flex items-center gap-x-2">
          <VscSignOut className="text-lg" />
          <span>Logout</span>
        </div>
      </button>
      }
    
    <div className="flex flex-col justify-center items-center">
    <div className="my-40 flex flex-col lg:flex-row text-left gap-3">
        <h1 className="text-left max-w-[20rem] text-white text-4xl font-semibold">
            Checkout these courses at your <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Institute</span>
            </h1>
            <div className="flex flex-col gap-5">
                <p className="text-white w-[400px]">Find out the courses of your interest and contact to the corresponding Instructor. Keep Learning!</p>
                <div className="max-w-xs">
                    <ButtonComp children={'Check Courses'} active={true} linkto={'/courses'}/>
                </div>
            </div>
        
    </div>

      
    <div className="mb-5 flex  flex-col lg:flex-row  gap-3">
        <h1 className="text-left max-w-[400px] text-white text-4xl font-semibold">
        Checkout these Blogs by your  <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Alumni</span>
            </h1>
            <div className="flex flex-col gap-5">
                <p className="text-white w-[400px]">We believe that any student can excel in their lives by getting proper guidance. And there can be no better guide than the people who are working in the industry for years. Get to know the present stats of the industry by reading the blogs of your seniors.</p>
                <div className="max-w-xs">
                    <ButtonComp children={'Check Blogs'} active={true} linkto={'/blogs'}/>
                </div>
            </div>
        
    </div>

    </div>


    </div>
  )
}

export default Dashboard