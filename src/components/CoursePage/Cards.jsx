import React, { useState } from 'react';
import Card from './Card';

function Cards (props) {
    let courses = props.courses;
    let category = props.category;

    const [likedCourses, setLikedCourses] = useState([]);
    
    let getCourses = () => {
        if (category === "All"){
            let allCourses = [];
            Object.values(courses).forEach( array => {
                array.forEach( course => {
                    allCourses.push(course);
                })
            })
            return allCourses;
        }
        else {
            return courses[category];
        }
    }


    return (
        <div className='my-5 w-11/12 max-w-[800px] gap-x-28 gap-y-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                getCourses().map( course => {
                    return <Card key={course.id} course={course} likedCourses={likedCourses} setLikedCourses={setLikedCourses}/>
                })    
            }
        </div>
    )

}

export default Cards;