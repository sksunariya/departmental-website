const express = require("express");
const profileRoutes = express.Router();


const {updateProfile, deleteAccount, updateProfilePicture } = require('../controllers/Profile');
const { auth } = require('../middlewares/auth');

profileRoutes.put('/user/profile/updateProfile', auth, updateProfile);
profileRoutes.put('/user/profile/updateProfile/profilePicture', auth, updateProfilePicture);
profileRoutes.delete('/user/profile/deleteAccount', auth, deleteAccount);

module.exports = profileRoutes;