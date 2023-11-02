import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setuserData] = useState({});

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth/me", {
          withCredentials: true,
        });

        if (response.data && response.data._id) {
          setIsLoggedIn(true);
          setuserData(response.data);
        } else {
          setIsLoggedIn(false);
          setuserData({});
        }
      } catch (error) {
        setIsLoggedIn(false);
        setuserData({});
      }
    };
    checkUser();
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setuserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
