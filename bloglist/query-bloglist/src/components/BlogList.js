import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, user }) => {

  const getBlogList = () =>
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={{ ...blog, user: user }}
        />
      ));

  return <div>{getBlogList()}</div>;
};

export default BlogList;
