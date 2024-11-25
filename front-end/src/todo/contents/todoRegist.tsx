import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type TodoDataType = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

type ListPropsType = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setList: Function;
};

const TodoRegist = ({ setList }: ListPropsType) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const resetData = () => {
    setTitle("");
    setContent("");
  };

  const registData = () => {
    if (title === "") return toast.warn("제목을 입력해주세요.");
    if (content === "") return toast.warn("내용을 입력해주세요.");

    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8080/todos",
        {
          title: title,
          content: content,
        },
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((result) => {
        const data = result.data.data;
        setList((prev: TodoDataType[]) => [...prev, data]);
        toast.info("TODO 데이터가 등록되었습니다.");
        resetData();
      })
      .catch(() => {
        toast.warn("TODO 데이터 등록에 실패하였습니다.");
      });
  };

  return (
    <div className="todo_regist_box">
      <h2>TODO Regist</h2>
      <div className="regist_contents">
        <div className="con_box">
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="con_box">
          <label>내용</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <input
        type="button"
        className="regist_btn"
        value="등록"
        onClick={registData}
      />
    </div>
  );
};

export default TodoRegist;
