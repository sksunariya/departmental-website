const mongoose = require("mongoose");
require('dotenv').config();


exports.connectdb = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {console.log("Database connected successfully.")})
    .catch((error) => {
        console.log("Error while connecting to database.");
        console.log(error);
    })
}