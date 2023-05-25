import { useState, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const login = (auth) => {
    setAuth(auth);
  };
  const logout = () => {
    setAuth(null);
  };
  return (
    <AuthContext.Provider value={{ auth, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
