import { createContext, useState, useContext } from "react";
import userService, { getUser, loginUser } from "../services/userService";

const authContext = createContext(null);
authContext.displayName = "auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const refreshUser = () => setUser(getUser());

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    refreshUser();

    return response;
  };

  const logout = () => {
    userService.logout();
    refreshUser();
  };

  return (
    <authContext.Provider
      value={{ user, login, logout, createUser: userService.createUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
