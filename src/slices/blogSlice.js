import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userBlogs: null,
  updateBlog: null,
  allBlogs: null,
  deleteBlog: null,
  loading: false,
}

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setUserBlogs: (state, action) => {
      state.userBlogs = action.payload
    },
    setUpdateBlog: (state, action) => {
      state.updateBlog = action.payload
    },
    setAllBlogs: (state, action) => {
      state.allBlogs = action.payload
    },
    setDeleteBlog: (state, action) => {
      state.deleteBlog = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
})

export const {setUserBlogs, setAllBlogs, setUpdateBlog, setLoading, setDeleteBlog} = blogSlice.actions

export default blogSlice.reducer