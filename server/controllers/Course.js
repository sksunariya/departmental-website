const Course = require('../models/Course');
const User = require("../models/User");
const Category = require("../models/Category");
const { uploadImageToCloudinary } = require('../utils/imageUploader');
require('dotenv').config();
const RatingAndReview = require("../models/RatingAndReview");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");


// createCourse

exports.createCourse = async (req, res) => {
    try {
        //fetch all details from req
        const {courseName, courseDescription, price, category, whatYouWillLearn} = req.body;
        const thumbnail = req.files.thumbnailImage;

        // validation - check if details are empty
        if (!courseName || !courseDescription || !price || !category || !whatYouWillLearn || !thumbnailImage){
            return res.json({
                success: false,
                message: "Fill all the details."
            })
        }

        // check the instructor exists or not
        const instructorId = req.user.id;
        const instructorDetails = await User.findById(instructorId);

        if (!instructorDetails){
            return res.status(401).json({
                success: false,
                message: "Not an authorised instructor."
            })
        }

        //check if category is valid or not
        const categoryDetails = await Category.findById(category);

        if (!categoryDetails) {
            return res.json({
                success:false,
                message: "Category is not valid."
            })
        }

        // upload thumbnail to cloudinary
        const uploadedThumbnail = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create entry for new course in DB
        const newCourse = Course.create({
            courseName,
            courseDescription,
            price,
            whatYouWillLearn,
            thumbnail: uploadedThumbnail.secure_url,
            category: categoryDetails._id,
            instructor: instructorDetails._id
        })

        //add ID of new course to instructor
        const updatedInstructor = await User.findByIdAndUpdate(
                                                            {_id : instructorDetails._id}, 
                                                            {$push: {courses: newCourse._id}}, 
                                                            {new: true})
                                                            .populate("courses")
                                                            .exec();

        //add ID of new course to Category
        const updatedTag = await Category.findByIdAndUpdate(
                                                        {_id: categoryDetails._id},
                                                        {$push: {course: newCourse._id}},
                                                        {new: true})
                                                        .populate("course")
                                                        .exec();

        //return response
        res.status(200).json({
            success: true,
            message: "Course created successfully.",
            newCourse,
            updatedInstructor,
            updatedTag
        })
        
        
    } catch (error) {
        console.log("Error while creating course.", error);
        res.status(500).json({
            success:false,
            message: "Server Error while creating course, Try again."
        })
    }
}



//showAllCourses

exports.showAllCourses = async (req, res) => {
    try {
        //fetch all courses from DB
        const allCourses = await Course.find({},{courseName: true,
                                                courseDescription: true,
                                                instructor: true,
                                                thumbnail:true,
                                                ratingAndReview: true,
                                                studentsEnrolled: true
                                            }).populate("instructor").exec();

        // return response
        res.status(200).json({
            success: true,
            message:"All courses fetched successfully.",
            allCourses
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Server Error while creating course, Try again."
        })
    }
}



// getCourseDetails 

exports.getCourseDetails = async (req, res) => {
    try {
        //fetch courseId
        const {courseId} = req.body;

        //find course details and populate everything (section and sub-section, instructor and it's profile, category, students enrolled, ratingAndReviews)
        const courseDetails = await Course.findById(courseId)
                                                    .populate(
                                                        {
                                                            path: 'ratingAndReviews',
                                                            populate: {
                                                                path : 'user'
                                                            }
                                                        }
                                                    )
                                                    .populate(
                                                        {
                                                            path: 'instructor',
                                                            populate: {
                                                                path: 'additionalDetails'
                                                            }
                                                        }
                                                    )
                                                    .populate(
                                                        {
                                                            path: 'courseContent',
                                                            populate: {
                                                                path: 'subSection'
                                                            }
                                                        }
                                                    )
                                                    .populate(
                                                        {
                                                            path: 'category',
                                                            populate: {
                                                                path: 'course'
                                                            }
                                                        }
                                                    )
                                                    .populate('studentsEnrolled')
                                                    .exec();


        if (!courseDetails) {
            return res.status(400).json({
                success:false,
                message: "Coudn't found course details.",
            })
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully.",
        })

        
    } catch (error) {
        console.log("Error while fetching the course details.")
        res.status(500).json({
            success:false,
            message: "Server Error while creating course, Try again."
        })
    }
}