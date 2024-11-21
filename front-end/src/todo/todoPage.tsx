import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type TodoDataType = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

const TodoPage = () => {
  const [list, setList] = useState<TodoDataType[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/todos", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((result) => {
        setList(result.data.data);
      })
      .catch(() => {
        toast.warn("TODO List 호출에 실패하였습니다.");
      });
  }, []);

  return (
    <div className="todo_list_box">
      <h2>TODO LIST</h2>
      {list.map((li) => {
        return (
          <div className="todo_box">
            <span className="todo_title">{li.title}</span>
            <span className="todo_content">{li.content}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TodoPage;
