// authContext
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        navigate("/dashboard");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const signupStep1 = async (email, password) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUserId(data.data.id);
        navigate("/signup1");
      } else {
        console.error("Signup step 1 failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const signupStep2 = async (companyName, phoneNumber) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/fullRegister`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, companyName, phoneNo: phoneNumber }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        navigate("/dashboard");
      } else {
        console.error("Signup step 2 failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logout = async () => {
    setUserId(null);
    setAccessToken(null);
    setRefreshToken(null);
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/logout`;
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      console.error("Error:", error);
    }
    navigate("/");
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  useEffect(() => {
    const token = getCookie('accessToken');
    if (token) {
      setAccessToken(token);
    } else {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        signupStep1,
        signupStep2,
        logout,
        userId,
        accessToken,
        refreshToken,
        getCookie,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
