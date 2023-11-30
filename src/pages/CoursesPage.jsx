import React from "react";
import { useState, useEffect } from "react";
import Cards from "../components/CoursePage/Cards";
import Filter from "../components/CoursePage/Filter";
import Spinner from "../components/CoursePage/Spinner";
import { cData, filterData } from "../data/courseData";
import toast from "react-hot-toast";
import CoursePageTopBar from '../components/CoursePage/CoursePageTopBar';
import Footer from "../components/common/Footer";


function CoursePage() {

    const [courses, setCourses] = useState(cData.data);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(filterData[0].title);
  
    async function fetchData() {
      setLoading (true);
      try { 
        // const res = await fetch(apiUrl);
        // const output = await res.json();
        setCourses(cData.data);
      }
      catch (error) {
        toast.error("Something went wrong.");
      }
      setLoading(false);
    };
  
    useEffect( () => {
      fetchData();
    }, [] );
  
  
    return (
      <div>
        <div className='min-h-screen flex flex-col items-center bg-[rgb(55,55,90)]'>
          <Filter filterData={filterData} category={category} setCategory={setCategory}/>
          {loading ? <Spinner/> : <Cards courses={courses} category={category}/>}
        </div>

        <Footer/>
      </div>

    );
  }
  
  export default CoursePage;
  