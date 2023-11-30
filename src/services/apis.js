// require("dotenv").config();

// const BASE_URL = process.env.REACT_APP_BASE_URL + '/api/v1'
const BASE_URL = 'http://localhost:4000/api/v1'


export const endpoints = {
    SIGNUP_API : BASE_URL + '/user/signup',
    LOGIN_API: BASE_URL + '/user/login',
    SENDOTP_API: BASE_URL + '/user/sendotp',
    RESETPASSTOKEN_API: BASE_URL + '/user/resetPassToken',
    RESETPASS_API: BASE_URL + '/user/resetPassword',

    CONTACT_US_API : BASE_URL + '/contact',
}