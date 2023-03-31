import React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../services/users";

const User = () => {
  const { userId } = useParams();
  const { user } = useUser(userId);

  if (user.isLoading) return <div>Loading...</div>;

  const userData = user.data;

  if (!userData) {
    return null;
  }
  
  return (
    <div className="mt-4">
      <h3>{userData.name}</h3>
      <h5>Created Blogs:</h5>
      <ul>
        {userData.blogs.map(blog => <li key={blog._id}>{blog.title}</li>)}
      </ul>
    </div>
  );
};

export default User;
