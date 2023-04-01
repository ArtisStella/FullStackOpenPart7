import "./App.css";

import { Outlet } from "react-router-dom";
import { useAuth, useLogout } from "./components/AuthenticationContext";

import Notification from "./components/Notification";
import Navigation from "./components/Navigation";

const App = () => {
  const authUser = useAuth();
  const logout = useLogout();

  return (
    <div className="container mt-4">
      <h2>Blogs</h2>
      {authUser ? (
        <>
          <div>
            <span className="me-2">{authUser.name} logged in.</span>
            <button className="btn btn-outline-primary btn-sm" onClick={logout}>
              Log out
            </button>
          </div>
          <Navigation />
        </>
      ) : null }
      <Notification />
      <hr />
      <Outlet />
    </div>
  );
};

export default App;
