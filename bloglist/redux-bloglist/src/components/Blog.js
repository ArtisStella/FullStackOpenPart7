import React, { useState } from "react";
import Togglable from "./Togglable";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { DeleteBlog, LikeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const [likes, setLikes] = useState(blog.likes);
  const blogByUser = blog.author.username === blog.user.username ? true : false;

  const likeBlog = async (blog) => {
    dispatch(LikeBlog(blog));
    setLikes(blog.likes + 1);
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure want to delete this blog?")) {
      console.log(id);
      dispatch(DeleteBlog(id));
    }
  };

  return (
    <div className="blog">
      <Togglable
        buttonLabel="View"
        closeButtonLabel="Collapse"
        text={blog.title + " - " + blog.author.name}
      >
        <div className="mb-2">
          <h5 className="title">{blog.title}</h5>
          <a className="url" href={blog.url}>
            {blog.url}
          </a>
          <div className="likes">
            <span className="mb-0 me-2">Likes: {likes}</span>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                likeBlog(blog, setLikes);
              }}
            >
              Like
            </button>
          </div>
          <p className="author">{blog.author.name}</p>
          {blogByUser ? (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                deleteBlog(blog.id);
              }}
            >
              Delete
            </button>
          ) : null}
        </div>
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
