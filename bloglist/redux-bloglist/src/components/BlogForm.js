import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddBlog } from "../reducers/blogReducer";
import { SetNotification } from "../reducers/notificationReducer";

const BlogForm = () => {
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const dispatch = useDispatch();

  const saveBlogHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(AddBlog({ title, url }));
      dispatch(SetNotification("Success!", 3));
      setTitle("");
      setUrl("");
    } catch (exception) {
      dispatch(SetNotification("An error occured!", 3));
    }
  };

  return (
    <div className="col-md-3 my-4">
      <h5>Add New</h5>
      <form onSubmit={saveBlogHandler}>
        <div className="mb-2">
          <label className="form-label">Title</label>
          <input
            required
            className="form-control form-control-sm titleInput"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">URL</label>
          <input
            required
            className="form-control form-control-sm urlInput"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="btn btn-primary btn-sm addBlogBtn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
