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
  const {user} = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      { user &&
      <div className="relative hidden md:block mx-auto w-11/12 max-w-maxContent">
        <button onClick={() => dispatch(logout(navigate))} className="absolute rounded-md top-2 px-4 py-2 right-2 border text-lg font-lg text-richblack-300">
          <div className="flex items-center gap-x-2">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>
      }

      <div className='flex justify-center items-center'>

        <div className="relative w-11/12 max-w-[670px]">
          <div className="w-[500px] flex gap-6 mx-auto mt-20">
            
            <ButtonComp className="w-[100px]" children={"See your Blogs"} active={true} linkto={'/blog/userBlogs'} />

            <ButtonComp children={"Create Blog"} active={true} linkto={'/blog/createBlog'}/>

          </div>


          <div className="w-11/12 max-w-[670px] py-8 flex flex-col gap-y-7 mb-[10px]">
            <div className="my-10 flex flex-col text-left gap-5">
                <h1 className="text-left max-w-[500px] text-white text-4xl font-semibold">
                    Checkout these courses at your <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Institute</span>
                </h1>

                <div className="flex flex-col gap-5">
                  <p className="text-white">Find out the courses of your interest and contact to the corresponding Instructor. Keep Learning!</p>
                  <div className="max-w-xs">
                      <ButtonComp children={'Check Courses'} active={true} linkto={'/courses'}/>
                  </div>
                </div>
                
            </div>

            
            <div className="mb-5 flex  flex-col  gap-5">
                <h1 className="text-left max-w-[500px] text-white text-4xl font-semibold">
                  Checkout these Blogs by your  <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Alumni</span>
                </h1>
                    <div className="flex flex-col gap-5">
                        <p className="text-white">We believe that any student can excel in their lives by getting proper guidance. And there can be no better guide than the people who are working in the industry for years. Get to know the present stats of the industry by reading the blogs of your seniors.</p>
                        <div className="max-w-xs">
                            <ButtonComp children={'Check Blogs'} active={true} linkto={'/blog/showAllBlogs'}/>
                        </div>
                    </div>
                
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}

export default Dashboard