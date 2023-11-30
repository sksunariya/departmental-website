const Course = require("../models/Course");
const Section = require("../models/Section");


//createSection

exports.createSection = async (req, res) => {
    try {
        // fetch data from req
        const {sectionName, courseId} = req.body;
        
        //validate - check if details are filled
        if (!sectionName || !courseId) {
            return res.json({
                success:false,
                message: "Fill the details."
            })
        }

        // create entry for the section in DB
        const section = await Section.create({sectionName:sectionName});

        //save ID of section in course - courseContent
        const updatedCourse = await Course.findByIdAndUpdate({_id: courseId},
                                                             {$push: {courseContent: section._id}},
                                                             {new:true})
                                                             .populate('courseContent')
                                                             .exec();

        //return response
        res.status(200).json({
            success:true,
            message: "Section created successfully and it's ID is saved in corresponding course.",
            section,
            updatedCourse
        });

        
    } catch (error) {
        console.log("Error while creating section.", error);
        res.status(500).json({
            success:false,
            message: "Error occurred while creating section."
        })
    }
}



//updateSection

exports.updateSection = async (req, res) => {
    try {
        // fetch data from req
        const {sectionName, sectionId} = req.body;

        // validate - check if data is missing
        if (!sectionName, !sectionId) {
            return res.json({
                success: false,
                message: "Please fill all the details."
            })
        }

        // update data in DB
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
                                                                {sectionName: sectionName},
                                                                {new: true});
        
        // return response
        return res.status(200).json({
            success:true,
            message: "Section updated successfully.",
            updatedSection
        })
        
    } catch (error) {
        console.log("Error while updating section.", error);
        res.status(500).json({
            success:false,
            message: "Error occurred while updating section."
        })
    }
}




//  deleteSection

exports.deleteSection = async (req, res) => {
    try {
        // fetch ID - should be sent with api from user end
        const {sectionId} = req.params;

        // find in DB and delete
        await Section.findByIdAndDelete({_id: sectionId});

        // return response
        return res.status(200).json({
            success:true,
            message: "Section deleted successfully."
        })
        
    } catch (error) {
        console.log("Error while deleting section.", error);
        res.status(500).json({
            success:false,
            message: "Error occurred while deleting section."
        })
    }
}