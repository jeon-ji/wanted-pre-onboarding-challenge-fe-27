import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginPage from "./login/loginPage";
import SignUpPage from "./signUp/signUpPage";
import TodoPage from "./todo/todoPage";

import "./App.css";
import "./style/common.css";
import "./style/content.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </>
  );
}

export default App;
