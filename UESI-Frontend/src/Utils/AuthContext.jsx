import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/status", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setIsLogin(true);
          setIsAdmin(data.user?.isAdmin || false);
          setUser(data.user);
        }
      })
      .catch(() => {
        setIsLogin(false);
        setIsAdmin(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, isAdmin, setIsLogin, setIsAdmin, user }}>
      {children}
    </AuthContext.Provider>
  );
};
