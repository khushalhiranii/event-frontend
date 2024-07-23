import React, { createContext, useState, useCallback } from "react";
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
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        console.log(data)
        // Handle successful login, e.g., navigate to the dashboard
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
      });

      if (response.ok) {
        const data = await response.json();
        setUserId(data.data.id);
        console.log(data.data.id)
        // Navigate to the second step of signup
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
      console.log(userId);
      const url = `${import.meta.env.VITE_API_URL}/auth/fullRegister`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, companyName, phoneNo: phoneNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        // Handle successful signup, e.g., navigate to the dashboard
        navigate("/dashboard");
      } else {
        console.error("Signup step 2 failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        signupStep1,
        signupStep2,
        userId,
        accessToken,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
