const express = require('express');
const courseRoutes = express.Router();


const { showAllCourses, getCourseDetails, createCourse } = require('../controllers/Course');
const { auth, isStudent , isInstructor, isAdmin } = require('../middlewares/auth');
const { createCategory, showAllCategories, categoryPageDetails } = require('../controllers/Category');
const { createRating, getAverageRating, getAllRating } = require('../controllers/RatingAndReview');
const { createSection, updateSection, deleteSection } = require('../controllers/Section');
const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/SubSection');




// COURSE

courseRoutes.get('/course/allCourses', showAllCourses);
courseRoutes.get('/course/courseDetails', getCourseDetails);
courseRoutes.post('/course/createCourse', auth, isInstructor, createCourse);



//SECTION

courseRoutes.post('/course/section/createSection', auth, isInstructor, createSection);
courseRoutes.post('/course/section/updateSection', auth, isInstructor, updateSection);
courseRoutes.post('/course/section/deleteSection', auth, isInstructor, deleteSection);



// SUB-SECTION

courseRoutes.post('/course/section/subSection/createSubSection', auth, isInstructor, createSubSection);
courseRoutes.post('/course/section/subSection/updateSubSection', auth, isInstructor, updateSubSection);
courseRoutes.post('/course/section/subSection/deleteSubSection/:subSectionId', auth, isInstructor, deleteSubSection);



// CATEGORY

courseRoutes.post('/course/courseCategory/createCategory', auth, isAdmin, createCategory);
courseRoutes.get('/course/courseCategory/showAllCategories', showAllCategories);
courseRoutes.get('/course/courseCategory/categoryPageDetails', categoryPageDetails);


// RATING AND REVIEWS

courseRoutes.post('/course/ratingandreview/createRating', auth, isStudent, createRating);
courseRoutes.get('/course/ratingAndReviews/getAverageRating', getAverageRating);
courseRoutes.get('/course/ratingAndReviews/getAllRating', getAllRating);


module.exports = courseRoutes;