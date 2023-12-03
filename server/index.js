const express = require("express");
const app = express();

const database = require('./config/database');
const cloudinary = require('./config/cloudinary');
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const cors = require('cors');
const dotenv = require('dotenv');

const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payments');
const profileRoutes = require('./routes/Profile');
const userRoutes = require('./routes/User');
const blogRoutes = require('./routes/Blog');



// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/'
    })
)
// ADDING CORS SUCH THAT BACKEND ENTERTAINS REQUEST OF FRONTEND
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))


// MOUNTING ROUTES
app.use('/api/v1', courseRoutes);
app.use('/api/v1', paymentRoutes);
app.use('/api/v1', profileRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', blogRoutes);



// CONNECT DATABASE
database.connectdb();

// CONNECT CLOUDINARY
cloudinary.cloudinaryConnect();


// ACTIVATE SERVER
dotenv.config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port number ${PORT}.`)
})