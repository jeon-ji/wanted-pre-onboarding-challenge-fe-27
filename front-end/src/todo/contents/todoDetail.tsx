import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type DetailPropsType = {
  selectId: string;
};

type TodoDataType = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

const TodoDetail = ({ selectId }: DetailPropsType) => {
  const [data, setData] = useState<TodoDataType>({
    title: "",
    content: "",
    id: "",
    createdAt: "",
    updatedAt: "",
  });
  useEffect(() => {
    if (selectId) {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:8080/todos/${selectId}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((result) => {
          setData(result.data.data);
        })
        .catch(() => {
          toast.warn("TODO List 호출에 실패하였습니다.");
        });
    }
  }, [selectId]);

  return (
    <div className="todo_detail_box">
      <h2>Todo Detail</h2>
      <div className="detail_box">
        <label>제목 : {data.title}</label>
        <label>내용 : {data.content}</label>
        <label>생성일 : {data.createdAt}</label>
        <label>수정일 : {data.updatedAt}</label>
      </div>
      <div>
        <input type="button" value="수정" />
      </div>
    </div>
  );
};

export default TodoDetail;
