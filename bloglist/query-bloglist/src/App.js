import { Outlet } from "react-router-dom";

import Notification from "./components/Notification";

const App = () => {
  return (
    <div className="container mt-4">
      <h2>Blogs</h2>
      <Notification />
      <Outlet />
    </div>
  );
};

export default App;
