import React from "react"
import FoundingStory from "../assets/Images/FoundingStory.png"
import Footer from "../components/common/Footer"

const About = () => {
  return (
    <div>
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          
          <header className="mx-auto py-10 text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a Brighter Future
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              CodeCraft is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering a nurturing a vibrant learning community.
            </p>
          </header>

        </div>
      </section>


      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-16 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">

              This Association aims to advance the understanding and application of your core courses. Through research, education, and collaboration, it seeks to promote scientific discovery, technological innovation, and the dissemination of knowledge. The association fosters a community of physicists to address global challenges and contribute to the progress of science and society.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                As experienced educators, your Instructors witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            <div>
              <img src={FoundingStory} alt="" className="shadow-[0_0_20px_0] shadow-[#FC6767]" />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-10 lg:my-16 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="my-12 lg:my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
              Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>


      <Footer />
      
    </div>
  )
}

export default About