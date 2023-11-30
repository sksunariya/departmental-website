const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const crypto = require('crypto');
const bcrypt = require('bcrypt');



// resetPassword token

exports.resetPasswordToken = async (req, res) => {
    try {
        // fetch email from req
        const {email} = req.body;

        // check if email format is valid
        if (!email){
            return res.json({
                success: false,
                message: "Please type your the email."
            })
        }

        // check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                success:false,
                message: "User is not registered. Please sign up first."
            })
        }

        // generate token
        const token = crypto.randomUUID();

        //update user - add token and it's expiration time
        const updatedUser = await User.findOneAndUpdate({email:email},
                                                        {
                                                            token:token,
                                                            resetPasswordExpires: Date.now() + 5*60*1000
                                                        },
                                                        {new: true}
        );

        // create URL
        const url = `http://localhost:3000/user/update-password/${token}`;

        // send mail containing url
        await mailSender(email, "Reset Password", `Follow this link to reset your password: ${url}`);

        // return response
        return res.status(200).json({
            success:true,
            message: "Mail send successfully, check mail to reset password."
        })
        
    } catch (error) {
        console.log("Error while resetting password.", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while resetting password"
        })
    }

}



// resetPassword

exports.resetPassword = async (req, res) => {
    try {
        // fetch data
        const {token, password, confirmPassword} = req.body;

        //validate
        if (password !== confirmPassword){
            return res.json({
                success:false,
                message: "Password not matching."
            })
        }

        // get user details from DB using token
        const userDetails = await User.findOne({token:token});

        //if user not found
        if (!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid"
            });
        }

        // check token time
        if (userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message: "Token is expired"
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //update password
        await User.findOneAndUpdate(
            {token: token},
            {password:hashedPassword},
            {new: true}
        )

        //return response
        res.status(200).json({
            success:true,
            message:"Password updated successfully."
        })
        
    } catch (error) {
        console.log("Error while resetting password.", error);
        res.status(500).json({
            success:true,
            message: "Error while resetting password."
        })
    }
}