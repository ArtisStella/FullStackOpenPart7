import { useState, useEffect } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { SetToken, useBlog } from "./services/blogs";

export const MainPage = ({ user }) => {
  const { blogs } = useBlog();

  const logout = () => {
    window.localStorage.removeItem("loggedInUser");
    user.setUser(null);
  };

  if (blogs.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <span className="me-2">{user.user.name} logged in.</span>
        <button className="btn btn-outline-primary btn-sm" onClick={logout}>
          Log out
        </button>
      </div>
      <Togglable buttonLabel="Add New">
        <BlogForm />
      </Togglable>
      <BlogList blogs={blogs.data} user={user.user} />
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = window.localStorage.getItem("loggedInUser");
    if (user) {
      setUser(JSON.parse(user));
      SetToken(JSON.parse(user).token);
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2>Blogs</h2>
      <Notification />
      {user ? (
        <MainPage user={{ user, setUser }} />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

export default App;
