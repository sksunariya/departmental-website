const RatingAndReview = require("../models/RatingAndReview");
const User = require("../models/User");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");


// create Rating

exports.createRating = async (req, res) => {
    try {
        // fetch user id  and other details
        const userId = req.user.id;
        const {rating, review, courseId} = req.body;

        // validate
        if (!rating || !review || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details.",
            })
        }

        //check if user is enrolled or not
        const userDetails = await User.findById(userId);

        if (!userDetails.courses.includes(courseId)){
            return res.status(403).json({
                success:false,
                message: "User is not registered in the course.",
            })
        }

        // check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({user: userId, course: courseId});
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "User has already reviewed the course.",
            })
        }

        //create RatingAndReview
        const newRating = await RatingAndReview.create({
                                                        rating: rating,
                                                        review: review,
                                                        user: userId,
                                                        course: courseId
        });

        //update course by saving ID of newRating in course
        const updatedCourse = await Course.findByIdAndUpdate({_id: courseId},
                                                            {$push: {ratingAndReviews: newRating._id}},
                                                            {new: true});

        // return response
        return res.status(200).json({
            success: true,
            message: "Rating and review was submitted successfully.",
            newRating,
        })
        
    } catch (error) {
        console.log("Error while creating rating and review.", error);
        res.status(500).json({
            success: false,
            message: "Error occurred while creating rating and review.",
        })
    }
}



// getAverageRating

exports.getAverageRating = async (req, res) => {
    try {
        // get course Id
        const {courseId} = req.body;

        // calculate average rating using aggregate function
        const result = await RatingAndReview.aggregate([
            {
                $match: { course: new mongoose.Types.ObjectId(courseId) },
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);

        //return rating
        if(result.length > 0) {
            return res.status(200).json({
                success:true,
                message:"Average rating fetched successfully.",
                averageRating: result[0].averageRating,
            })
        }

        // if no rating present
        return res.status(200).json({
            success: true,
            message: "Course has not been reviewed by anyone.",
            averageRating: 0
        })
        
    } catch (error) {
        console.log("Error while getting average rating and review.", error);
        res.status(500).json({
            success: false,
            message: "Error occurred while getting average rating and review.",
        })
    }
}



// getAllRating

exports.getAllRating = async (req, res) => {
    try {
        // fetch all rating from DB
        const allRatings = await RatingAndReview.find({})
                                                    .sort({rating: "desc"})
                                                    .populate({
                                                        path: 'course',
                                                        select: 'courseName'  // only courseName will be populated
                                                    })
                                                    .populate({
                                                        path: 'user',
                                                        select: "firstName lastName email image"
                                                    })
                                                    .exec();

        // return response
        return res.status(200).json({
            success:true,
            message: "All ratings were fetched successfully.",
            allRatings
        })


        
    } catch (error) {
        console.log("Error while getting average rating and review.", error);
        res.status(500).json({
            success: false,
            message: "Error occurred while getting average rating and review.",
        })
    }
}