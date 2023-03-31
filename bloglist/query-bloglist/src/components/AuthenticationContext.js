import { createContext, useContext, useReducer, useMemo } from "react";
import { SetToken } from "../services/requests";
import loginService from "../services/login";

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "RESET":
      return "";
    default:
      return state;
  }
};

const UserContext = createContext();

export const useLogin = (dispatch=null) => {
  dispatch = dispatch ? dispatch : useContext(UserContext)[1];

  return async (credentials = null) => {
    let user;
    if (!credentials) {
      user = window.localStorage.getItem("loggedInUser");
      user = user ? JSON.parse(user) : null;
    } else {
      user = await loginService.login(credentials);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    }
    if (user) SetToken(user.token);
    dispatch({ type: "SET", payload: user });
  };
};

export const useLogout = () => {
  const dispatch = useContext(UserContext)[1];
  return () => {
    window.localStorage.removeItem("loggedInUser");
    dispatch({ type: "RESET" });
  };
};

export const useAuth = () => {
  const [user] = useContext(UserContext);
  return user;
};

export const AuthenticationProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, {});
  const logIn = useLogin(dispatch);

  useMemo(() => {
    logIn();
  }, []);
  
  return (
    <UserContext.Provider value={[user, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
