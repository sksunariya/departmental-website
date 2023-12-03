const Blog = require('../models/Blog');
const User = require('../models/User');


// create Blog

exports.createBlog = async (req, res) => {
    try {
        // fetch details of blog from req
        const {title, description, category, tags} = req.body;

        // fetch the details of blog creater
        const userId = req.user.id;

        // check for validation
        if (!title || !description || !category) {
            return res.json({
                success: false,
                message: "Please fill all the required data."
            })
        }

        // fetch user details from the user Id
        const userDetails = await User.findById(userId);

        if (!userDetails) {
            return res.json({
                success: false,
                message: "User details not found."
            })
        }

        const tagArray = tags.split(' ');

        // create Blog
        const createdBlog = await Blog.create({
            title,
            description,
            category,
            tags: tagArray,
            createdAt: Date.now(),
            creater: userDetails._id,
        })

        // save the blogId in user details
        const updatedUser = await User.findByIdAndUpdate(userDetails._id, 
                                                    {$push: {blogs: createdBlog._id}},
                                                    {new: true})
                                                    .populate('blogs')
                                                    .exec();

        // return response

        return res.status(200).json({
            success: true,
            message: "Blog created successfully.",
            createdBlog,
            updatedUser
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while creating Blog",
            Error: error.message,
        })
    }
}


// update Blog

exports.updateBlog = async (req, res) => {
    try {
        // fetch details of blog from req
        const {title, description, category, blogId} = req.body;

        // fetch the details of blog creater
        const userId = req.user.id;

        // check for validation
        if (!title || !description || !category) {
            return res.json({
                success: false,
                message: "Please fill all the required data."
            })
        }

        // fetch user details from the user Id
        const userDetails = await User.findById(userId);
        console.log("User details in update blog in blog controller.", userDetails);

        const blogDetails = await Blog.findById(blogId);
        console.log("blog details in update blog in blog controller.", blogDetails);

        console.log("blog creater: ", blogDetails.creater)
        console.log("user id" , userDetails._id)
        if (!blogDetails.creater.equals(userDetails._id)) {
            return res.status(503).json({
                success: false,
                message: "User Id doesn't match with blog creater Id. You are not authorised to do this task."
            })
        }

        // update Blog
        const updatedBlog = await Blog.findByIdAndUpdate(blogDetails._id,
                                                    {
                                                        title,
                                                        description,
                                                        category,
                                                        createdAt: Date.now(),
                                                        creater: userDetails._id,
                                                    },
                                                    {new: true})
                                                    .populate('creater')
                                                    .exec();

        // return response

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully.",
            updatedBlog,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while updating Blog",
            Error: error.message,
        })
    }
}


// delete Blog

exports.deleteBlog = async (req, res) => {
    try {
        // fetch blog Id
        const {blogId} = req.body;
        // const blogId = blog._id;
        console.log("blog id in deleteblog in blog controller", blogId)
        // if (!blogId) {
        //     return res.status(503).json({
        //         success: false,
        //         message: "Blog Id is not valid."
        //     })
        // }

        const userId = req.user.id;
        
        // fetch user details from the user Id
        const userDetails = await User.findById(userId);
        console.log("User details in update blog in blog controller.", userDetails);

        const blogDetails = await Blog.findById(blogId);
        console.log("blog details in update blog in blog controller.", blogDetails);

        console.log("blog creater: ", blogDetails.creater)
        console.log("user id" , userDetails._id)
        if (!blogDetails.creater.equals(userDetails._id)) {
            return res.status(503).json({
                success: false,
                message: "User Id doesn't match with blog creater Id. You are not authorised to do this task."
            })
        }

        // delete Blog from database
        await Blog.findByIdAndDelete(blogId);

        return res.status(200).json({
            success: true,
            message: "Blog was deleted successfully."
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while deleting Blog",
            Error: error.message,
        })
    }
}


// fetch all blogs

exports.showAllBlogs = async (req, res) => {
    try {
        // fetch all blogs
        const allBlogs = await Blog.find({})
                                    .populate('creater', {firstName: true, lastName: true, email: true})
                                    .exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Blogs fetched successfully.",
            allBlogs
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while fetching Blogs",
            Error: error.message,
        })
    }
}



// fetch user Blogs

exports.getUserBlog = async (req, res) => {
    try {
        // fetch user id
        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User Not found",
            })
        }

        // fetch all blogs where user Id matches
        const userBlogs = await Blog.find({creater: userDetails._id}).populate('creater', {firstName:true, lastName: true, email: true}).exec();

        // return response
        return res.status(200).json({
            success:true,
            message: "User Blogs fetched successfully.",
            userBlogs
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while fetching user Blogs",
            Error: error.message,
        })
    }
}