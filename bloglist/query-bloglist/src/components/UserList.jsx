import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users }) => {

  const getUserList = () => {
    return users.map((user) => {
      return ( 
        <tr key={user.id}>
          <td> <Link to={"/users/" + user.id}> {user.name} </Link></td>
          <td>{user.blogs.length}</td>
        </tr>
      );
    });
  };

  return (
    <div className="col-md-3">
      <table className="table">
        <thead>
          <tr>
            <td>User</td>
            <td>Blogs</td>
          </tr>
        </thead>
        <tbody className="userList">{getUserList()}</tbody>
      </table>
    </div>
  );
};

export default UserList;
