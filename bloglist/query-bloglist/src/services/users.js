import { useQuery } from "react-query";
import { getUserById, getUsers } from "./requests";

export const useUsers = () => {
  const fetchQuery = useQuery("users", getUsers, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { users: fetchQuery };
};

export const useUser = (id) => {
  const fetchQuery = useQuery("user", () => getUserById(id), {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { user: fetchQuery };
};
