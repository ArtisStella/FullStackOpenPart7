import { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import App from "../App";
import { useUser } from "../components/AuthenticationContext";
import Login from "../components/Login";
import Home from "../pages/Home";

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
      path: "/login",
      element: <Login />,
    },
  ],
};

function Routes() {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    user ? navigate("/") : navigate("/login");
  }, [user]);

  return useRoutes([MainRoutes]);
}

export default Routes;
