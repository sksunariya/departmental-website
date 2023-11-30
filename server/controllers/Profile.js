const User = require("../models/User");
const Profile = require("../models/Profile");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { findById } = require("../models/OTP");


//update Profile

exports.updateProfile = async (req, res) => {
    try {
        // fetch data
        const {dateOfBirth, about, contactNumber, gender} = req.body;

        console.log("details obtained ", dateOfBirth, about, contactNumber, gender);

        // get user
        // const token = req.body.token;
        // console.log("Token obtained in params is " , token);

        // const decode = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decode DETAILS: ", decode);


        const userId = req.user.id;

        const userDetails = await User.findById(userId);
        console.log("user details: ", userDetails);

        // find profileDetails
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        console.log("user details are: ", userDetails);
        console.log(profileDetails);

        // check data and store in the in profileDetails object
        if (dateOfBirth) {
            profileDetails.dateOfBirth = dateOfBirth;
        }
        if (about) {
            profileDetails.about = about;
        }
        if (contactNumber) {
            profileDetails.contactNumber = contactNumber;
        }
        if (gender) {
            profileDetails.gender = gender;
        }

        // save profileDetails in DB
        await profileDetails.save();

        // return response 
        return res.status(200).json({
            success:true,
            message: "Profile Details updated successfully.",
            profileDetails
        })
        
    } catch (error) {
        console.log("Error while updating profile." , error);
        res.status(500).json({
            success:false,
            message: "Error while updating profile, Try again."
        })
    }
}



// updateProfilePicture

exports.updateProfilePicture = async (req, res) => {
    try {
        // fetch profile picture
        const profilePicture = req.files.profilePicture;

        // get userId from request
        const userId = req.user.id;
        if (!userId) {
            return res.status(403).json({
                success: true,
                message: "User id not found",
            })
        }

        // get user details based on user Id from DB
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success: true,
                message: "User not found."
            })
        }

        console.log("Image to be uploaded on cloud" , profilePicture);

        // upload image to cloudinary and store the url in user schema
        const response = await uploadImageToCloudinary(profilePicture, process.env.FOLDER_NAME);

        const updatedUserDetails = await User.findByIdAndUpdate(userDetails._id,
                                                                {image: response.secure_url},
                                                                {new: true});

        return res.status(200).json({
            success: true,
            message: 'Profile picture updated successfully.',
            updatedUserDetails
        })

        
        
    } catch (error) {
        console.log("Error while updating profile Picture." , error);
        res.status(500).json({
            success:false,
            message: "Error while updating profile picture, Try again."
        })
    }
}



// delete account

exports.deleteAccount = async (req, res) => {
    try {
        // get user id
        const userId = req.user.id;

        // check user in database
        const userDetails = await User.findById(userId);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User Id not found."
            })
        }

        // fetch corresponding profile Id and delete profile
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete(profileId);

        // delete user 
        await User.findByIdAndDelete(userDetails._id);

        // return response
        return res.status(200).json({
            success:true,
            message:"Account was deleted successfully."
        })
        
    } catch (error) {
        console.log("Error while deleting account." , error);
        res.status(500).json({
            success:false,
            message: "Error while deleting account, Try again."
        })
    }
}




// get account details ??
// exports.getUserDetails