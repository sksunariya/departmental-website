require("dotenv").config();
const jwt = require("jsonwebtoken");



// auth

exports.auth = async (req, res, next) => {
    try {
        // console.log(req);
        console.log(req.body);
        console.log(req.body.token);
        //extract token
        const token = req?.body?.token || req?.cookies?.token || req?.header("Authorization").replace("Bearer ","");

        // token missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found."
            })
        }

        // verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decode from jwt verify function. ", decode);
            req.user = decode;
            console.log("req.user in auth middleware. ", req.user);

        } catch (error) {
            return res.status(401).json({
                success:true,
                message: "Token is not valid."
            })
        }

        next();
        
    } catch (error) {
        console.log("Error occurred while authenticating token.", error);
        res.status(500).json({
            success:false,
            message: "Error while authenticating token."
        })
    }
}



// isStudent

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Student'){
            return res.status(401).json({
                success: false,
                message: "This is protected route for students only."
            })
        }
        next();
        
    } catch (error) {
        console.log("User role can't be verified", error);
        return res.status(500).json({
            success:false,
            message: "User role cannot be verified, Try again."
        })
    }
}



// isInstructor

exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Instructor'){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Instructor only."
            })
        }
        next();
        
    } catch (error) {
        console.log("User role can't be verified", error);
        return res.status(500).json({
            success:false,
            message: "User role cannot be verified, Try again."
        })
    }
}



// isAdmin

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Admin'){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin only."
            })
        }
        next();
        
    } catch (error) {
        console.log("User role can't be verified", error);
        return res.status(500).json({
            success:false,
            message: "User role cannot be verified, Try again."
        })
    }
}