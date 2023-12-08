
const BASE_URL = process.env.REACT_APP_BASE_URL + '/api/v1'

export const endpoints = {
    SIGNUP_API : BASE_URL + '/user/signup',
    LOGIN_API: BASE_URL + '/user/login',
    SENDOTP_API: BASE_URL + '/user/sendotp',
    RESETPASSTOKEN_API: BASE_URL + '/user/resetPassToken',
    RESETPASS_API: BASE_URL + '/user/resetPassword',

    CONTACT_US_API : BASE_URL + '/contact',


    // blogs
    CREATEBLOG_API: BASE_URL + '/blog/createBlog',
    UPDATEBLOG_API: BASE_URL + '/blog/updateBlog',
    DELETEBLOG_API: BASE_URL + '/blog/deleteBlog',
    SHOWALLBLOGS_API: BASE_URL + '/blog/showAllBlogs',
    USERBLOGS_API: BASE_URL + '/blog/userBlogs',
}
