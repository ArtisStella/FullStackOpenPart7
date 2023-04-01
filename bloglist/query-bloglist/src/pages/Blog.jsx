import React, { useState } from "react";
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

  const [ comments, setComments ] = useState([]);

  if (blog.isLoading) return <div>Loading...</div>;

  const blogData = blog.data;

  const blogByUser = blogData.author.username === user.username ? true : false;

  const deleteBlogHanlder = (id) => {
    if (window.confirm("Are you sure want to delete this blog?")) {
      deleteBlog(id);
      navigate("/");
    }
  };

  const addComment = (e) => {
    e.preventDefault();
    let comment = e.target.elements.comment.value;
    e.target.elements.comment.value = "";
    setComments(comments.concat(comment));
  };


  return (
    <div className="mb-2 col-md-3">
      <div className="col d-flex justify-content-between">
        <span className="title h3">{blogData.title}</span>
        {blogByUser ? (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              deleteBlogHanlder(blogData.id);
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
      <a className="url" href={blogData.url}>
        {blogData.url}
      </a>
      <div className="likes">
        <span className="mb-0 me-2">Likes: {blogData.likes}</span>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            likeBlog(blogData);
          }}
        >
          Like
        </button>
      </div>
      <p className="author">By: {blogData.author.name}</p>

      <h5>Comments: </h5>
      <form className="col d-flex my-2" onSubmit={addComment}>
        <input
          className="form-control form-control-sm d-inline me-2"
          name="comment"
        />
        <button type="submit" className="btn btn-sm btn-primary">
          Add
        </button>
      </form>
      <ul>
        { comments.map((comment, i) => <li key={i}>{comment}</li>) }
      </ul>
    </div>
  );
};

export default Blog;
