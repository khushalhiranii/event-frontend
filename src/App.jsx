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
import { LoadingProvider } from "./context/Loadingcontext";
import LoadingIndicator from "./components/LoadingIndicator";
import Registration from "./admin/pages/Registration";
import FormPreview from "./admin/components/FormPreview";
import Employee from "./admin/pages/AgentList";
import EmployeeDetail from "./admin/pages/AgentForm";
import AgentList from "./admin/pages/AgentList";
import AgentForm from "./admin/pages/AgentForm";
import { AgentProvider } from "./admin/context/AgentContext";
// import AssignAgent from "./admin/pages/AssignAgent";
import AttendieInfo from "./admin/pages/AttendieInfo";
import { RegisteredUsersProvider } from "./admin/context/RegisteredUsersContext";
import './index.css'
import AssignAgent from "./admin/pages/AssignAgent";
import ComingSoon from "./admin/pages/ComingSoon";
import GoogleLogin from "./admin/pages/googleLogin";


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
    const titlesAndDescriptions = {
      "/": { title: "Log In", description: "Log in to your account" },
      "/forgetpassword": { title: "Forget Password", description: "Recover your password" },
      "/forgetpassword1": { title: "Forget Password", description: "Recover your password" },
      "/resetpassword": { title: "Reset Password", description: "Reset your password" },
      "/passwordchanged": { title: "Password Changed", description: "Your password has been changed" },
      "/accountcreated": { title: "Account Created", description: "Your account has been created" },
      "/signup": { title: "Sign Up", description: "Create a new account" },
      "/signup1": { title: "Sign Up Step 1", description: "Create a new account - Step 1" },
      "/signup2": { title: "Sign Up Step 2", description: "Create a new account - Step 2" },
    };

    const { title, description } = titlesAndDescriptions[pathname] || { title: "App", description: "App Description" };
    document.title = title;

    const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.content = description;
    }
  }, [pathname]);

  return (
    <LoadingProvider>
      <AuthProvider>
        <AgentProvider>
          <EventProvider>
            <EventProvider2>
              <RegisteredUsersProvider>
                <LoadingIndicator />
                <Routes>
                  <Route path="/forgetpassword" element={<PublicRoute><ForgetPassword /></PublicRoute>} />
                  <Route path="/forgetpassword1" element={<PublicRoute><ForgetPassword1 /></PublicRoute>} />
                  <Route path="/resetpassword" element={<PublicRoute><ResetPassword /></PublicRoute>} />
                  <Route path="/passwordchanged" element={<PublicRoute><PasswordChanged /></PublicRoute>} />
                  <Route path="/accountcreated" element={<PublicRoute><AccountCreated /></PublicRoute>} />
                  <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
                  <Route path="/signup1" element={<PublicRoute><SignUp1 /></PublicRoute>} />
                  <Route path="/signup2" element={<PublicRoute><SignUp2 /></PublicRoute>} />
                  <Route path="/" element={ localStorage.getItem('accessToken') ?
                    <PrivateRoute><Layout /></PrivateRoute> : <LogIn/>}>
                    <Route path="dashboard" element={<TodoList />} />
                    <Route path="add" element={<TodoForm />} />
                    <Route path="edit/:id" element={<TodoForm />} />
                    <Route path="registered/:id" element={<Registration />} />
                    <Route path="registered/:id/:attendieId" element={<AttendieInfo />} />
                    <Route path="form/:id" element={<FormPreview />} />
                    <Route path="employees" element={<AgentList />} />
                    <Route path="employees/add" element={<AgentForm />} />
                    <Route path="employees/edit/:id" element={<AgentForm />} />
                    <Route path="assign-agent/:eventId" element={<AssignAgent />} />
                    <Route path="coming/:id" element={<ComingSoon/>}/>
                    
                  </Route>
                  <Route path="/googleLogin" element={<GoogleLogin/>}/>
                  <Route path="/events" element={<HomePage />} />
                  <Route path="/events/:id" element={<FormRoute><EventPage /></FormRoute>} />
                </Routes>
              </RegisteredUsersProvider>
            </EventProvider2>
          </EventProvider>
        </AgentProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
