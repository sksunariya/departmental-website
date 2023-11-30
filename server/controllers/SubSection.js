const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();


// createSubSection

exports.createSubSection = async (req, res) => {
    try {
        // fetch data from req
        const {sectionId, title, timeDuration, description} = req.body;
        const videoFile = req.files.videoFile;

        //validation
        if(!sectionId || !title || !timeDuration || !description || !videoFile) {
            return res.status(400).json({
                success:false,
                message: "Please fill all the details."
            })
        }

        // upload video to cloudinary
        const uploadedFile = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME);

        // create sub section and save the url of the video 
        const newSubSection = await SubSection.create({
                                                title,
                                                timeDuration,
                                                description,
                                                videoUrl: uploadedFile.secure_url,
        })

        // save the ID of created sub section in Section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, 
                                                                {$push: {subSection: newSubSection._id}},
                                                                {new: true})
                                                                .populate("subSection")
                                                                .exec();

        // return response
        res.status(200).json({
            success:true,
            message: "Sub Section created successfully.",
            newSubSection,
            updatedSection
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Server Error while creating sub section, Try again."
        })
    }
}




// update sub section

exports.updateSubSection = async (req, res) => {
    try {
        // fetch data 
        const {subSectionId, title, timeDuration, description} = req.body;
        const videoFile = req.files.videoFile;

        // validate
        if (!subSectionId) {
            return res.status(400).json({
                success:false,
                message: "Sub section Id is not valid."
            })
        }

        //fetch sub section details from DB
        const subSectionDetails = await SubSection.findById(subSectionId);

        // DELETE THE PREVIOUS VIDEO ??
        // check if video is updated or not - if yes upload it to cloudinary
        if (videoFile){
            const updatedVideo = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME); 
            subSectionDetails.videoUrl = updatedVideo.secure_url;
        }
        
        // update rest of details
        if (title) {
            subSectionDetails.title = title;
        }
        if (timeDuration) {
            subSectionDetails.timeDuration = timeDuration;
        }
        if (description) {
            subSectionDetails.description = description;
        }

        // save subsection in DB
        await subSectionDetails.save();

        //return response
        return res.status(200).json({
            success:true,
            message: "Sub section updated successfully.",
            subSectionDetails
        })
                                                                    
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Server Error while creating sub section, Try again."
        })
    }
}




// delete sub section

exports.deleteSubSection = async (req, res) => {
    try {
        // fetch data from req
        const {subSectionId} = req.params;

        // delete sub section  - [ Deleting video from cloudinary ?? ]
        await SubSection.findByIdAndDelete(subSectionId);

        // return response
        return res.status(200).json({
            success:true,
            message: "Sub Section was deleted successfully."
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Server Error while creating sub section, Try again."
        })
    }
}