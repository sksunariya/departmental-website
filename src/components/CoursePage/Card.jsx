import React, { useState } from 'react';
import {FcLike, FcLikePlaceholder} from "react-icons/fc";
import { toast } from "react-hot-toast";

function Card (props) {
    let  course = props.course;
    let likedCourses = props.likedCourses;
    let setLikedCourses = props.setLikedCourses;

    
    function clickHandler(){
        if ((likedCourses).includes(course.id)){
            setLikedCourses( (prev) => prev.filter(cid => cid !== course.id));
            toast.warning("Liked Removed.");
        }
        else{
            if (likedCourses.length === 0){
                setLikedCourses([course.id]);
            }
            else{
                setLikedCourses((prev) => [...prev, course.id]);
            }
            toast.success("Liked Successfully.");
        }
    }


    return(
        <div className='relative bg-[rgb(36,36,59)] flex flex-col w-[280px]'>

            <div className=''>
                <img className='w-[100%] h-[150px]' src={course.image.url} alt={course.image.alt}></img>
            </div>
            <div>
                <button onClick={clickHandler} className='absolute w-10 h-10 right-5 top-[7.75rem] bg-white flex justify-center items-center rounded-full'>
                    {likedCourses.includes(course.id) ? <FcLike fontSize="1.75rem" />  : <FcLikePlaceholder fontSize="1.75rem"/>}
                </button>
            </div>
            <div className='p-4'>
                <p className='text-white font-semibold text-xl leading-6'>{course.title}</p>
                <p className='mt-2 text-white'>{course.description.substr(0,100)}...</p>
            </div>


        </div>
    )
}


export default Card;