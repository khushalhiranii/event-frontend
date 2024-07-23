import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
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
import Layout from "./admin/pages/Layout";
import TodoList from "./admin/components/TodoList";
import TodoForm from "./admin/components/TodoForm";
import apiClient from "./admin/axiosSetup";

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

  const [todos, setTodos] = useState([]);

  useEffect(async() => {
    const savedTodos = await apiClient.get('/admin/event?status=ACTIVE')
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    console.log(todos)
    // localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = async (todo) => {
    setTodos([...todos, { ...todo, id: Date.now() }]);
    const savedTodos = await apiClient.post('/admin/event/register', todo)
  };

  const updateTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo));
    setTodos(updatedTodos);
    // const savedTodos = apiClient.patch('/admin/event/4')
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <AuthProvider>
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
      <Route path="/dashboard" element={<Layout/>}>
        <Route index element={<TodoList todos={todos} onDelete={deleteTodo} />} />
        <Route path="add" element={<TodoForm onSubmit={addTodo} />} />
        <Route path="edit/:id" element={<TodoForm todos={todos} onSubmit={updateTodo} />} />
      </Route>
    </Routes>
    </AuthProvider>
  );
}
export default App;
