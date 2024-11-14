import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [btnState, setBtnState] = useState<boolean>(false);

  useEffect(() => {
    if (!emailRegEx.test(email) || !passwordRegEx.test(pwd)) setBtnState(false);
    else setBtnState(true);
  }, [email, pwd]);

  const login = () => {
    axios
      .post("http://localhost:8080/users/login", {
        email: email,
        password: pwd,
      })
      .then((result) => {
        console.log(result);
        toast.info("로그인");
      })
      .catch((err) => {
        toast.warn(err.response.data.details);
      });
  };

  return (
    <div className="login_box">
      <h3>Login</h3>
      <input
        className="input_box"
        type="text"
        placeholder="이메일(아이디)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input_box"
        type="password"
        placeholder="비밀번호"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      <input
        className="btn"
        type="button"
        style={{ marginRight: "10px" }}
        value="로그인"
        disabled={!btnState}
        onClick={login}
      />
      <input
        className="btn"
        type="button"
        value="회원가입"
        onClick={() => console.log("회원가입")}
      />
    </div>
  );
};

export default LoginPage;
