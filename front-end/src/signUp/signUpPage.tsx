import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [btnState, setBtnState] = useState<boolean>(false);

  useEffect(() => {
    if (!emailRegEx.test(email) || !passwordRegEx.test(pwd)) setBtnState(false);
    else setBtnState(true);
  }, [email, pwd]);

  const signUp = () => {
    axios
      .post("http://localhost:8080/users/create", {
        email: email,
        password: pwd,
      })
      .then((result) => {
        toast.info(result.data.message);
        navigate("/");
      })
      .catch(() => {
        toast.warn("계정 생성에 실패하였습니다.");
      });
  };

  return (
    <div className="login_box">
      <h3>Sign Up</h3>
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
        value="회원가입"
        disabled={!btnState}
        onClick={signUp}
      />
    </div>
  );
};

export default SignUpPage;
