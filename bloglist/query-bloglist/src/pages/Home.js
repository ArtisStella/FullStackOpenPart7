import React from "react";
import { useLogout, useUser } from "../components/AuthenticationContext";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import Togglable from "../components/Togglable";
import { useBlog } from "../services/blogs";

const Home = () => {
  const user = useUser();
  const { blogs } = useBlog();
  const logout = useLogout();

  if (blogs.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <span className="me-2">{user.name} logged in.</span>
        <button className="btn btn-outline-primary btn-sm" onClick={logout}>
          Log out
        </button>
      </div>
      <Togglable buttonLabel="Add New">
        <BlogForm />
      </Togglable>
      <BlogList blogs={blogs.data} user={user} />
    </div>
  );
};

export default Home;
