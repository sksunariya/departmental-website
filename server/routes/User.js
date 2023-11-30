const express = require('express');
const userRoutes = express.Router();



const {signUp, sendOtp, login, changePassword} = require('../controllers/Auth');
const { auth } = require('../middlewares/auth');
const { resetPasswordToken, resetPassword } = require('../controllers/ResetPassword');


// Auth

userRoutes.post('/user/sendotp', sendOtp);
userRoutes.post('/user/signup', signUp);
userRoutes.post('/user/login', login);
userRoutes.post('/user/changePassword', changePassword);



// RESET PASSWORD

userRoutes.post('/user/resetPassword', resetPasswordToken);
userRoutes.post('/user/update-password', resetPassword);


module.exports = userRoutes;