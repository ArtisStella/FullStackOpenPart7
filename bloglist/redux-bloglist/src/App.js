import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import { InitializeBlogs } from "./reducers/blogReducer";
import { Logout } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector( state => {
    let blogs = state.blogs.slice();
    return blogs.sort((a, b) => b.likes - a.likes);
  });

  const user = useSelector( ({ user }) => user );

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure want to delete this blog?")) {
      await blogService.deleteBlog(id);
      dispatch(InitializeBlogs());
    }
  };

  useEffect(() => {
    if (user) {
      blogService.SetToken(user.token);
      dispatch(InitializeBlogs());
    }
  }, [user]);

  const logout = () => {
    dispatch(Logout());
  };

  const showBlogs = () => {
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
        {blogs
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={{ ...blog, user: user }}
              deleteBlog={deleteBlog}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h2>Blogs</h2>
      <Notification />
      {user ? showBlogs() : <Login />}
    </div>
  );
};

export default App;
