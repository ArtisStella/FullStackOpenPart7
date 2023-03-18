import React from "react";
import Togglable from "./Togglable";
import PropTypes from "prop-types";
import { useDeleteBlog, useLikeBlog } from "../services/blogs";

const Blog = ({ blog }) => {
  const blogByUser = blog.author.username === blog.user.username ? true : false;

  const likeBlog = useLikeBlog();
  const deleteBlog = useDeleteBlog();

  const deleteBlogHanlder = (id) => {
    if (window.confirm("Are you sure want to delete this blog?")) {
      deleteBlog(id);
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
            <span className="mb-0 me-2">Likes: {blog.likes}</span>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                likeBlog(blog);
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
                deleteBlogHanlder(blog.id);
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
