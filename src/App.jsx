import { useEffect } from "react";
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
        title = "";
        metaDescription = "";
        break;
      case "/forgetpassword":
        title = "";
        metaDescription = "";
        break;
      case "/forgetpassword1":
        title = "";
        metaDescription = "";
        break;
      case "/resetpassword":
        title = "";
        metaDescription = "";
        break;
      case "/passwordchanged":
        title = "";
        metaDescription = "";
        break;
      case "/accountcreated":
        title = "";
        metaDescription = "";
        break;
      case "/signup":
        title = "";
        metaDescription = "";
        break;
      case "/signup1":
        title = "";
        metaDescription = "";
        break;
      case "/signup2":
        title = "";
        metaDescription = "";
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
          <Route path="/" element={<LogIn />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/forgetpassword1" element={<ForgetPassword1 />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/passwordchanged" element={<PasswordChanged />} />
          <Route path="/accountcreated" element={<AccountCreated />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup1" element={<SignUp1 />} />
          <Route path="/signup2" element={<SignUp2 />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<TodoList />} />
            <Route path="add" element={<TodoForm />} />
            <Route path="edit/:id" element={<TodoForm />} />
          </Route>
          <Route path='/events' element={<HomePage />} />
          <Route path='/events/:id' element={<EventPage />} />
        </Routes>
        </EventProvider2>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
