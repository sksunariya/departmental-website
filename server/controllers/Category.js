const Category = require('../models/Category');
const Course = require('../models/Course');



// createCategory

exports.createCategory = async (req, res) => {
    try {
        // fetch data
        const {name, description} = req.body;

        // validate - check if data is empty
        if (!name || !description) {
            return res.json({
                success:false,
                message: "Enter all the details."
            })
        }

        //create entry in DB
        const createdCategory = await Category.create(
            {name: name,
            description: description}
        )
        console.log("Created Category is: ", createdCategory);

        //return response
        res.status(200).json({
            success: true,
            message: "Category created successfully."
        })

        
    } catch (error) {
        console.log("Error while creating Category.", error);
        return res.status(500).json({
            success: true,
            message: "Error occurred while creating Category."
        })
    }
}



//showAllCategories

exports.showAllCategories = async (req, res) => {
    try {
        //find all Categories in DB
        const allCategories = await Category.find({}, {name:true, description:true});

        //return response
        res.status(200).json({
            success: true,
            message: "All Categories fetched from database successfully.",
            allCategories
        })
        
    } catch (error) {
        console.log("Error while fetching Categories.", error);
        return res.status(500).json({
            success: true,
            message: "Error occurred while fetching Categories."
        })
    }
}



// get category page details
exports.categoryPageDetails = async (req, res) => {
    try {
        // fetch category Id
        const {categoryId} = req.body;

        // fetch courses corresponding to that fetched category
        const relatedCourses = await Course.find({category: categoryId});

        //validation
        if(!relatedCourses) {
            return res.status(404).json({
                success:false,
                message: "No course found."
            })
        }

        // fetch other courses than the fetched category
        const otherCourses = await Course.find({category:{ $ne: categoryId}});

        // fetch top selling courses - {it can be done by adding sold key in course schema which will be updated whenever it is bought by someone
        //                                then, comparing that variable for prioritise the courses for top selling courses.   }

        // return response
        return res.status(200).json({
            success:true,
            message: "Courses fetched Successfully.",
            relatedCourses,
            otherCourses
        })
        
    } catch (error) {
        console.log("Error while creating Category.", error);
        return res.status(500).json({
            success: true,
            message: "Error occurred while creating Category."
        })
    }
}