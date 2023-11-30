const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const {instance} = require("../config/razorpay");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");


//capture Payment
exports.capturePayment = async (req, res) => {
    try {
        // fetch courseID and userId 
        const {courseId} = req.body;
        const userId = req.user.id;

        //validate
        if (!courseId) {
            return res.status(400).json({
                success:false,
                message: "Course ID is not valid."
            })
        }
        const courseDetails = await Course.findById(courseId);
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "Course details are not valid."
            })
        }

        // check if user has already registered for the course
        const user_Obj_id = new mongoose.Types.ObjectId(userId); // first converting the user id from string type to OjectId type
        if (courseDetails.studentsEnrolled.includes(user_Obj_id)){
            return res.status(400).json({
                success:false,
                message: "User has already registerd for the course.",
            })
        }

        // create order
        const amount = courseDetails.price;
        const currency = "INR";
        const notes = {
            courseId: courseId,
            userId: userId,
        }

        const options = {
            amount: amount * 100,
            currency,
            notes,
        }

        const paymentResponse = await instance.orders.create(options);

        // return response
        return res.status(200).json({
            success: true,
            message: "Order created successfully.",
        })

        
    } catch (error) {
        console.log("Error occurred while creating order.", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating order",
            Error: error.message,
        })
    }
}




// verifySignature

exports.verifySignature = async (req, res) => {
    try {
        // create web hook secret
        const webHookSecret = '12345';

        // fetch signature send by razorpay
        const signature = req.header['x-razorpay-signature'];

        // hash the webHookSecret
        const shasum = crypto.createHmac("sha256", webHookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        // check if signature and digest are matching or not 
        if (digest === signature) {
            // Authorised
            console.log("Payment is authorised.");

            //Add courseId to User
            const {courseId, userId} = req.body.payload.payment.entity.notes;
            const updatedUser = await User.findByIdAndUpdate(userId,
                                                            {$push: {courses: courseId}},
                                                            {new: true});

            console.log("User details from enrolling the course", updatedUser);

            // add userId to course
            const updatedCourse = await Course.findByIdAndUpdate(courseId,
                                                                {$push: {studentsEnrolled: userId}},
                                                                {new: true});
                                                                
            console.log("Course details from enrolling the course", updatedCourse);
            
            if (!updatedCourse) {
                return res.status(500).json({
                    success:false,
                    message: "Course was not found."
                })
            }

            // send mail to the user
            
            const mailResponse = await mailSender(updatedUser.email,
                                                    "Course Enrollment confirmation",
                                                    "Congratulations, you have successfully enrolled in the course.");

            console.log(mailResponse);
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Signature verified and course assigned to the user.",
        })

        
    } catch (error) {
        console.log("Error occurred while creating order.", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating order",
            Error: error.message,
        })
    }
}