import {combineReducers} from "@reduxjs/toolkit";

import authSlice from "../slices/authSlice"
import profileSlice from "../slices/profileSlice";
import courseSlice from "../slices/courseSlice"

import blogSlice from "../slices/blogSlice";


const rootReducer  = combineReducers({
    auth: authSlice,
    profile:profileSlice,
    course:courseSlice,

    blog: blogSlice,
})

export default rootReducer