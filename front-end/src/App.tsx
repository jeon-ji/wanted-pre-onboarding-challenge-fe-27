import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./style/common.css";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./login/loginPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
