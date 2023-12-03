import toast from "react-hot-toast";

import { setLoading } from "../../slices/profileSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setAllBlogs, setUserBlogs } from "../../slices/blogSlice";


const {CREATEBLOG_API, SHOWALLBLOGS_API, USERBLOGS_API, UPDATEBLOG_API, DELETEBLOG_API} = endpoints;

export function createBlog (title, description, category, tags, navigate, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", CREATEBLOG_API, {title, description, category, tags},{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              })

            console.log("Response obtained from createBlog api", response);

            if (!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Blog created successfully.")
            navigate('/dashboard/my-profile')
            
        } catch (error) {
            console.log("Error in createBlog API", error);
            toast.error("Blog creation Failed.")
            navigate('/')
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


// show all blogs 

export function showAllBlogs () {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET", SHOWALLBLOGS_API,)

            console.log("Response obtained from SHOWALLBLOGS api", response.data.allBlogs);

            if (!response.data.success){
                throw new Error(response.data.message)
            }

            await dispatch(setAllBlogs(response.data.allBlogs))
            
        } catch (error) {
            console.log("Error in SHOW ALL Blog API", error);
        }
        dispatch(setLoading(false))
    }
}



// user Blogs 

export function userBlogsApi (navigate, token) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET", USERBLOGS_API, {},{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              })

            console.log("Response obtained from userBlogs api", response.data.userBlogs);

            if (!response.data.success){
                throw new Error(response.data.message)
            }

            await dispatch(setUserBlogs(response.data.userBlogs))
            
        } catch (error) {
            console.log("Error in SHOW ALL Blog API", error);
            navigate('/dashboard/my-profile');
        }
        dispatch(setLoading(false))
    }
}



// update Blog 

export function updateBlogApi (title, description, category, tags, blogId, navigate, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("PUT", UPDATEBLOG_API, {title, description, category, tags, blogId,},{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              })

            console.log("Response obtained from createBlog api", response);

            if (!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Blog updated successfully.")
            navigate('/blog/userBlogs')
            
        } catch (error) {
            console.log("Error in updateBlog API", error);
            toast.error("Blog updation Failed.")
            navigate('/blog/userBlogs')
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}



// delete blog 

export function deleteBlogApi (blogId, navigate, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading")
        dispatch(setLoading(true))
        try {
            console.log("blogId in deleteblog api", blogId);
            const response = await apiConnector("POST", DELETEBLOG_API, {blogId, },{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              })

            console.log("Response obtained from deleteBlog api", response);

            if (!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Blog deleted successfully.")
            navigate('/dashboard/my-profile')
            
        } catch (error) {
            console.log("Error in deleteBlog API", error);
            toast.error("Blog deletion Failed.")
            navigate('/blog/userBlogs')
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}