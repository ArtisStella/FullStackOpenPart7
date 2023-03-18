import axios from "axios";

const blogUrl = "/api/blogs";
const config = {};

export const SetHeaders = (newToken) => {
  config.headers = { Authorization: `Bearer ${newToken}` };
};

export const getBlogs = () =>
  axios.get(blogUrl, config).then((res) => res.data);

export const createBlog = (blog) =>
  axios.post(blogUrl, blog, config).then((res) => res.data);

export const likeBlog = (blog) =>
  axios.put(`${blogUrl}/${blog.id}`, blog, config).then((res) => res.data);

export const deleteBlog = (id) =>
  axios.delete(`${blogUrl}/${id}`, config);
