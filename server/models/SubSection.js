const mongoose = require("mongoose");


const subSection = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true
        },
        timeDuration:{
            type: String,
        },
        description: {
            type: String,
        },
        videoUrl:{
            type: String
        }
    }
);

module.exports = mongoose.model("SubSection", subSection);