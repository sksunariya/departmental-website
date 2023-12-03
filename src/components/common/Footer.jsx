import React from "react";
import { Link } from "react-router-dom";

import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex flex-row flex-wrap gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex gap-5 justify-between flex-wrap flex-row pb-5 border-richblack-700">
              <div>
                <p className="text-lg bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">CodeCraft</p>
                <h1 className="text-richblack-50 pl-4 font-semibold text-[14px]">
                  Society
                </h1>
              </div>

              <div className="flex  gap-10">
                {["About", "Contact", "Blogs"].map((ele, i) => {
                  return (
                    <div key={i} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                      <Link to={ele === 'Blogs' ? '/showAllBlogs' :`/${ele.toLowerCase()}`}> {ele} </Link>
                    </div>
                  );
                })}
              </div>


              
              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>






          <div className="text-center"> © 2023 CodeCraft</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;