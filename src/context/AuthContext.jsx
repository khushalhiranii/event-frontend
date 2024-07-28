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
      console.log(response)
      
      if (response.status === 200) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        navigate("/dashboard");
        return response;
      }else if(response.status === 210){
        setUserId(response.data.data.userId)
        navigate("/signup1");
        return response;
      }
       else {
        console.error("Login failed");
        return response;
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
        return response;
      } else {
        console.error("Signup step 1 failed");
        return response;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const googleSignup = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/google`;
      window.location.href = url;
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
        // navigate("/dashboard");
        return response;
      } else {
        console.error("Signup step 2 failed");
      }
    } catch (error) {
      console.error("Error:", error);
      
    }
  };

  const googleSignup2 = async (googleId, companyName, phoneNumber) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/fullRegister`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: googleId, companyName, phoneNo: phoneNumber }),
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
        googleSignup,
        googleSignup2
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
