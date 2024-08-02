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
      const url =`${import.meta.env.VITE_API_URL}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      console.log(response)
      const data = await response.json();
      console.log(data.data)
      // const accessToken = data.data.accessToken;
      const accessToken = response.headers['accessToken'];
      console.log(`new format ${accessToken}`)
      const accessToken2 = response.headers.get('accessToken');
      const refreshToken = response.headers.get('refreshToken');
      console.log(`access toke From headers ${accessToken2}`)

      if (accessToken2) {
        console.log('Access Token:', accessToken2);
        // Store the token, e.g., in local storage or state
        localStorage.setItem('accessToken', accessToken2);
        localStorage.setItem('refreshToken', refreshToken);
      } else {
        console.error('No access token found in response headers');
      }

      console.log("My response is :")
      console.log(response);
      
      console.log("My data is ")
      console.log(data);
  
      if (response.ok) {
        if (data.statusCode === 200) {
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          navigate("/dashboard");
        } else if (data.statusCode === 202) {
          setUserId(data.data.userId);
          navigate("/signup1");
        }
        return data;  // Return the actual data for further use
      } else {
        console.error("Login failed");
        return data;  // Return the data to check error messages and statusCode
      }
    } catch (error) {
      console.log("Here I have got error")
      console.log(error)
      console.error("Error:", error);
      return null;
    }
  };
  // const login = async (email, password) => {
  //   try {
  //     const url = `${import.meta.env.VITE_API_URL}/auth/login`;
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //       credentials: "include",
  //     });
  
  //     const data = await response.json();
  //     console.log(data);
  
  //     if (response.ok) {
  //       if (data.statusCode === 200) {
  //         setAccessToken(data.accessToken);
  //         setRefreshToken(data.refreshToken);
  //         navigate("/dashboard");
  //       } else if (data.statusCode === 202) {
  //         setUserId(data.data.userId);
  //         navigate("/signup1");
  //       }
  //       return response;
  //     } else {
  //       console.error("Login failed");
  //       return response;
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return null;
  //   }
  // };
  

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
      
      const data = await response.json();
      if (response.ok) {
        console.log(response)
        // setUserId(data.data.id);
        // navigate("/signup1");
      } else {
        console.error("Signup step 1 failed");
      }
      console.log(response);
      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
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
  

  const signupStep2 = async (token, companyName, phoneNumber) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/fullRegister`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, companyName, phoneNo: phoneNumber }),
        credentials: "include",
      });

      console.log(response)
      const data = await response.json();
      console.log(data.data)
      const accessToken = data.data.accessToken;

      const accessToken2 = response.headers.get('accessToken');
      const refreshToken = response.headers.get('refreshToken');
      console.log(`header ${accessToken2}`)
      if (accessToken2) {
        console.log('Access Token:', accessToken2);
        // Store the token, e.g., in local storage or state
        localStorage.setItem('accessToken', accessToken2);
        localStorage.setItem('refreshToken', refreshToken);
      } else {
        console.error('No access token found in response headers');
      }

  
      if (response.ok) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        return data;
      } else {
        console.error("Signup step 2 failed");
        return data;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
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
      console.log(response)
      const data = await response.json();
      console.log(data.data)
      const accessToken = data.data.accessToken;

      const accessToken2 = response.headers.get('accessToken');
      const refreshToken = response.headers.get('refreshToken');
      console.log(`header ${accessToken2}`)
      if (accessToken2) {
        console.log('Access Token:', accessToken2);
        // Store the token, e.g., in local storage or state
        localStorage.setItem('accessToken', accessToken2);
        localStorage.setItem('refreshToken', refreshToken);
      } else {
        console.error('No access token found in response headers');
      }
  
      
      if (response.ok) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        navigate("/dashboard");
      } else {
        console.error(`Signup step 2 failed with status code ${response.status} and message: ${data.message || 'Unknown error'}`);
        return data; // Return the error data if you want to use it elsewhere
      }
    } catch (error) {
      console.error("Error during signup step 2:", error);
    }
  };
  

  const logout = async () => {
    // Clear user-related states
    setUserId(null);
    setAccessToken(null);
    setRefreshToken(null);
  
    // Clear session storage
    sessionStorage.clear();
    localStorage.clear();
  
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/logout`;
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies are included in the request
      });
    } catch (error) {
      console.error("Error:", error);
    }
  
    // Redirect to the home page or login page
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
