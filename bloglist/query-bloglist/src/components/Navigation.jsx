import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="my-2">
      <Link className="btn btn-primary me-2" to={"/"}>Home</Link>
      <Link className="btn btn-primary me-2" to={"/users"}>Users</Link>
    </div>
  );
};

export default Navigation;
