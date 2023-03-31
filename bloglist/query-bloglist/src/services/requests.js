import axios from "axios";

const blogUrl = "/api/blogs";
const userUrl = "/api/users";
const config = {};

export const SetToken = (newToken) => {
  config.headers = { Authorization: `Bearer ${newToken}` };
};

//  Blogs
export const getBlogs = () =>
  axios
    .get(blogUrl, config)
    .then((res) => res.data)
    .catch(() => []);

export const getBlog = (id) => 
  axios
    .get(`${blogUrl}/${id}`, config)
    .then((res) => res.data)
    .catch(() => []);


export const createBlog = (blog) =>
  axios
    .post(blogUrl, blog, config)
    .then((res) => res.data)
    .catch((e) => e);

export const likeBlog = (blog) =>
  axios.put(`${blogUrl}/${blog.id}`, blog, config).then((res) => res.data);

export const deleteBlog = (id) => axios.delete(`${blogUrl}/${id}`, config);

//  Users
export const getUsers = () =>
  axios
    .get(userUrl, config)
    .then((res) => res.data)
    .catch(() => []);

export const getUserById = (id) =>
  axios
    .get(`${userUrl}/${id}`, config)
    .then((res) => res.data)
    .catch(() => {});
