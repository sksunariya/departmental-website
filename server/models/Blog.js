const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
        },

        tags: [{
            type: String,
        }],
        creater: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        }
    }
);

module.exports = mongoose.model("Blog", BlogSchema);