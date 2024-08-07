import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogIn from "../pages/log-in";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const navigate = useNavigate();

  const handleResponse = (response) => {
    const accessToken = response.headers.get('accessToken');
    const refreshToken = response.headers.get('refreshToken');

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      console.error('No access token found in response headers');
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      handleResponse(response);

      if (response.ok) {
        if (data.statusCode === 200) {
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          navigate("/dashboard");
        } else if (data.statusCode === 202) {
          setUserId(data.data.userId);
          navigate("/signup1");
        }
        return data;
      } else {
        console.error("Login failed");
        return data;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const signupStep1 = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(response);
        return data;
      } else {
        console.error("Signup step 1 failed");
        return data;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const googleSignup = async () => {
    try {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const signupStep2 = async (token, companyName, phoneNumber) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/fullRegister`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, companyName, phoneNo: phoneNumber }),
      });

      const data = await response.json();
      handleResponse(response);

      if (response.ok) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        navigate("/dashboard");
      } else {
        console.error("Signup step 2 failed");
        return data;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const logout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },
      });

      if (response.ok) {
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.clear()
        sessionStorage.clear()
        navigate("/")
        
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userId, accessToken, refreshToken, login, signupStep1, googleSignup, signupStep2, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
