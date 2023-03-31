import React from "react";
import UserList from "../components/UserList";
import { useUsers } from "../services/users";

const Users = () => {
  const { users } = useUsers();

  if (users.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <UserList users={users.data} />
    </div>
  );
};

export default Users;
