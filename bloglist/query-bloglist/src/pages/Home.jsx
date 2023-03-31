import React from "react";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import Togglable from "../components/Togglable";
import { useBlogs } from "../services/blogs";

const Home = () => {
  const { blogs } = useBlogs();
  
  if (blogs.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Togglable buttonLabel="Add New">
        <BlogForm />
      </Togglable>
      <BlogList blogs={blogs.data} />
    </div>
  );
};

export default Home;
