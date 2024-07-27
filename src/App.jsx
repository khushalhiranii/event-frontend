import React, { useEffect } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import LogIn from "./pages/log-in";
import ForgetPassword from "./pages/forget-password";
import ForgetPassword1 from "./pages/forget-password1";
import ResetPassword from "./pages/reset-password";
import PasswordChanged from "./pages/password-changed";
import AccountCreated from "./pages/account-created";
import SignUp from "./pages/sign-up";
import SignUp1 from "./pages/sign-up1";
import SignUp2 from "./pages/sign-up2";
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";
import Layout from "./admin/pages/Layout";
import TodoList from "./admin/components/TodoList";
import TodoForm from "./admin/components/TodoForm";
import { EventProvider2 } from "./user/context/EventContext";
import HomePage from "./user/pages/HomePage";
import EventPage from "./user/pages/EventPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import FormRoute from "./routes/FormRoute";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Log In";
        metaDescription = "Log in to your account";
        break;
      case "/forgetpassword":
        title = "Forget Password";
        metaDescription = "Recover your password";
        break;
      case "/forgetpassword1":
        title = "Forget Password";
        metaDescription = "Recover your password";
        break;
      case "/resetpassword":
        title = "Reset Password";
        metaDescription = "Reset your password";
        break;
      case "/passwordchanged":
        title = "Password Changed";
        metaDescription = "Your password has been changed";
        break;
      case "/accountcreated":
        title = "Account Created";
        metaDescription = "Your account has been created";
        break;
      case "/signup":
        title = "Sign Up";
        metaDescription = "Create a new account";
        break;
      case "/signup1":
        title = "Sign Up Step 1";
        metaDescription = "Create a new account - Step 1";
        break;
      case "/signup2":
        title = "Sign Up Step 2";
        metaDescription = "Create a new account - Step 2";
        break;
      default:
        title = "App";
        metaDescription = "App Description";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <AuthProvider>
      <EventProvider>
        <EventProvider2>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <LogIn />
                </PublicRoute>
              }
            />
            <Route
              path="/forgetpassword"
              element={
                <PublicRoute>
                  <ForgetPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/forgetpassword1"
              element={
                <PublicRoute>
                  <ForgetPassword1 />
                </PublicRoute>
              }
            />
            <Route
              path="/resetpassword"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/passwordchanged"
              element={
                <PublicRoute>
                  <PasswordChanged />
                </PublicRoute>
              }
            />
            <Route
              path="/accountcreated"
              element={
                <PublicRoute>
                  <AccountCreated />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path="/signup1"
              element={
                <PublicRoute>
                  <SignUp1 />
                </PublicRoute>
              }
            />
            <Route
              path="/signup2"
              element={
                <PublicRoute>
                  <SignUp2 />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<TodoList />} />
              <Route path="add" element={<TodoForm />} />
              <Route path="edit/:id" element={<TodoForm />} />
            </Route>
            <Route path="/events" element={<HomePage />} />
            <Route path="/events/:id" element={
              <FormRoute>
                <EventPage />
              </FormRoute>
            } />
          </Routes>
        </EventProvider2>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
