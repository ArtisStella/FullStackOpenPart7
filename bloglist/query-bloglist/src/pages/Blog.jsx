import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog, useDeleteBlog, useLikeBlog } from "../services/blogs";
import { useAuth } from "../components/AuthenticationContext";

const Blog = () => {
  const user = useAuth();
  const { blogId } = useParams();
  const blog = useBlog(blogId);
  const navigate = useNavigate();
  const likeBlog = useLikeBlog();
  const deleteBlog = useDeleteBlog();
  
  if (!blog) return null;

  const blogByUser = blog.author.username === user.username ? true : false;


  const deleteBlogHanlder = (id) => {
    if (window.confirm("Are you sure want to delete this blog?")) {
      deleteBlog(id);
      navigate("/");
    }
  };
  
  
  return (
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
  );
};

export default Blog;
