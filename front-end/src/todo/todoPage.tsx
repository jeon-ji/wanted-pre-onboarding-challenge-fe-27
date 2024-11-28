import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TodoList from "./contents/todoList";
import TodoDetail from "./contents/todoDetail";
import TodoRegist from "./contents/todoRegist";

type TodoDataType = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

const TodoPage = () => {
  const navigate = useNavigate();
  const [selectId, setSelectId] = useState<string>("");
  const [list, setList] = useState<TodoDataType[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      toast.warn("올바른 토큰이 아닙니다.");
    }
  }, []);

  return (
    <div className="todo_page">
      <h1>Todo Page</h1>
      <div className="center_contents">
        <TodoRegist setList={setList} />
        <TodoList setSelectId={setSelectId} list={list} setList={setList} />
        <TodoDetail
          selectId={selectId}
          setSelectId={setSelectId}
          list={list}
          setList={setList}
        />
      </div>
    </div>
  );
};

export default TodoPage;
