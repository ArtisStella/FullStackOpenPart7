import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      let id = action.payload;

      let blogToLike = state.find((blog) => blog.id === id);
      blogToLike.likes += 1;

      state.map((blog) => (blog.id === id ? blog : blogToLike));
    },
    removeBlog(state, action) {
      return state.filter( blog => blog.id !== action.payload );
    },
  },
});

const { setBlogs, likeBlog, removeBlog } = blogSlice.actions;

export const InitializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const AddBlog = (newBlog) => {
  return async (dispatch) => {
    await blogService.postBlog(newBlog);
    dispatch(InitializeBlogs());
  };
};

export const LikeBlog = (blog) => {
  return async (dispatch) => {
    blog = { ...blog, likes: blog.likes + 1 };
    await blogService.likeBlog(blog);
    dispatch(likeBlog(blog.id));
  };
};

export const DeleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(removeBlog(id));
  };
};

export default blogSlice.reducer;
