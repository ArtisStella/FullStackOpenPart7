import App from "../App";
import { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { useAuth } from "../components/AuthenticationContext";

//  Pages
import Login from "../pages/Login";
import Home from "../pages/Home";
import Users from "../pages/Users";
import User from "../pages/User";
import Blog from "../pages/Blog";

const MainRoutes = {
  path: "/",
  element: <App />,
  children: [
    {
      path: "/",
      element: <Home />,
      exact: true,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "users",
      children: [
        {
          path: "",
          element: <Users />,
          exact: true,
        },
        {
          path: ":userId",
          element: <User />
        }
      ]
    },
    {
      path: "blogs",
      children: [
        {
          path: ":blogId",
          element: <Blog />
        }
      ]
    }
  ],
};

function Routes() {
  const navigate = useNavigate();
  const user = useAuth();

  useEffect(() => {
    user ? null : navigate("/login");
  }, [user]);

  return useRoutes([MainRoutes]);
}

export default Routes;
