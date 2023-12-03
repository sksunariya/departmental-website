import React from 'react';
import Banner from '../assets/Images/banner.gif';
import ButtonComp from '../components/HomePage/Button';
import AnimationBlock from '../components/HomePage/AnimationBlock';
import Footer from '../components/common/Footer';

import BooksImage from "../assets/Images/booksImage.jpg";
import Logo1 from "../assets/Images/Logo1.svg";
import Logo2 from "../assets/Images/Logo2.svg";
import Logo3 from "../assets/Images/Logo3.svg";
import Logo4 from "../assets/Images/Logo4.svg";
import Alumni from '../assets/Images/alumniImage.jpg'


const HomePage = () => {
  return (
    <div className='pt-10'>

        {/* section - 1 */}

        <section className="relative mx-auto lg:h-screen   flex w-11/12 max-w-maxContent flex-col lg:flex-row items-center justify-between gap-8 text-white">
            <div className=' max-w-[600px] flex flex-col gap-16 text-center lg:text-left'>

                <h1 className=" text-4xl font-semibold">
                    Enhance Your skills with <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                        CodeCraft
                    </span>
                </h1>


                <p className=" text-lg font-bold text-richblack-300">
                    Embark on an exciting journey of knowledge and discovery with CodeCraft! We are thrilled to welcome you to a space where education transcends boundaries and technology empowers learning.
                </p>


                <div className="justify-center items-center lg:justify-normal lg:items-start flex flex-row gap-7">

                    <ButtonComp active={true} linkto={"/signup"}>
                        Sign Up
                    </ButtonComp>
                    <ButtonComp active={false} linkto={"/login"}>
                        Log In
                    </ButtonComp>

                </div>


            </div>
            

            <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                <img src={Banner} width={500} className='shadow-[20px_20px_rgba(255,255,255)] '/>

            </div>


        </section>




        {/* section 2 */}


        <section className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">

            {/* code animation 1  */}
            <div>
                <AnimationBlock
                    position={'lg:flex-row'}
                    heading={<div className="text-4xl font-semibold">
                                Unlock your <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                                     Coding Potential
                                </span> with us.
                            </div>}

                    description={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                    ButtonText1={"Try it Yourself"}
                    ButtonText2={"Learn More"}

                    active1={true}
                    active2={false}
                    link1={'/signup'}
                    link2={'/login'}

                    codecolor = {'text-yellow-25'}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>

            
            {/* code animation 2  */}

            <div>
                <AnimationBlock
                    position={`lg:flex-row-reverse`}
                    heading={<div className="text-4xl font-semibold">
                                Improve your <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold"> Coding Potential</span> with our online courses.
                            </div>}

                    description={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                    ButtonText1={"Try it Yourself"}
                    ButtonText2={"Learn More"}

                    active1={true}
                    active2={false}
                    link1={'/signup'}
                    link2={'/login'}
                    codecolor = {'text-white'}
                    backgroundGradient={<div className="codeblock2 absolute"></div>}
                />
            </div>

        </section>



        {/* section 3 */}


        <section className="bg-[#EAF6F6]">
            <div className=' text-richblack-700 mx-auto flex w-11/12 max-w-maxContent flex-row items-center justify-between gap-8 '>
                <div className="mb-10 mt-[50px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                    
                    <div className="text-4xl font-semibold lg:w-[45%] ">
                        Get the skills and <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Excel</span> in Life
                    </div>
                
                    <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                        <div className="text-[16px]">
                            The CodeCraft offers a unique opportunity to connect to your seniors at one place and get to the in demand skills. Get professional guidance from your seniors and excel in your life.
                        </div>
                        <ButtonComp active={true} linkto={'signup'}>Know More</ButtonComp>
                    </div>

                </div>
            </div>



            <div className='flex justify-center items-center'>


                <div className=" w-11/12 max-w-maxContent flex flex-col lg:flex-row gap-20 mb-20 items-center justify-between">
                    <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
                        
                        <div className="flex flex-col lg:gap-3">
                            <div className="flex gap-6">
                                <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                                    <img src={Logo1}/>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-[18px]">Connect to Alumni</h2>
                                    <p className="text-base">Connects you to the Alumni</p>
                                </div>

                            </div>


                            <div className="flex gap-6">
                                <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                                    <img src={Logo2}/>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-[18px]">Academics</h2>
                                    <p className="text-base">Get updates about various resources.</p>
                                </div>

                            </div>
                            <div className="flex gap-6">
                                <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                                    <img src={Logo3}/>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-[18px]">Blogs</h2>
                                    <p className="text-base">Read top Blogs by your Alumni</p>
                                </div>

                            </div>
                            <div className="flex gap-6">
                                <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                                    <img src={Logo4}/>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-[18px]">Get the Guidance</h2>
                                    <p className="text-base">Get the solution for your career.</p>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div>

                    </div>



                    <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
                        <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
                            <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
                                <h1 className="text-3xl font-bold w-[75px]">10</h1>
                                <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                                    Years experiences
                                </h1>
                            </div>
                            <div className="flex gap-5 items-center lg:px-14 px-7">
                                <h1 className="text-3xl font-bold w-[75px]">150</h1>
                                <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                                    Different Companies
                                </h1>
                            </div>
                        </div>

                        <img src={BooksImage}/>

                    </div>



                </div>

            </div>


        </section>



        {/* section 4 */}


        <section className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
            <div>
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-[50%]">
                        <img src={Alumni} alt='alumni image' className="shadow-white shadow-[-20px_-20px_0_0]"/>
                    </div>
                    <div className="lg:w-[50%] flex gap-10 flex-col">

                        <h1 className="lg:w-[50%] text-4xl font-semibold text-white">Are you a <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Alumni?</span> </h1>

                        <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
                            We are on a mission to connect to all the alumni. We would love to have you back. Guide you juniors on this portal.
                        </p>

                        <div className="w-fit">
                            <ButtonComp active={true} linkto={'/signup'}>Join as Alumni</ButtonComp>
                        </div>
                    </div>
                </div>
            </div>
        </section>



      {/* <Footer /> */}
      <Footer />


    </div>
  )
}

export default HomePage