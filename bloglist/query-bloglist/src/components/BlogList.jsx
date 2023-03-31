import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  const getBlogList = () =>
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <div key={blog.id}>
          <hr />
          <Link to={"/blogs/" + blog.id}>
            {blog.title + " - " + blog.author.name}
          </Link>
        </div>
      ));

  return <div className="col-md-6 list">{getBlogList()}</div>;
};

export default BlogList;
