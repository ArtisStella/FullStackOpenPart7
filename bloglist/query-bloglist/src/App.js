import { useMemo } from "react";
import { useLogin, useUser } from "./components/AuthenticationContext";

import Login from "./components/Login";
import Notification from "./components/Notification";
import Home from "./pages/Home";

const App = () => {
  const user = useUser();
  const logIn = useLogin();
  
  useMemo( () => {
    logIn();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Blogs</h2>
      <Notification />
      {user ? (
        <Home />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
