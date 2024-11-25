import { useState } from "react";
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
  const [selectId, setSelectId] = useState<string>("");
  const [list, setList] = useState<TodoDataType[]>([]);

  return (
    <div className="todo_page">
      <h1>Todo Page</h1>
      <div className="center_contents">
        <TodoRegist setList={setList} />
        <TodoList setSelectId={setSelectId} list={list} setList={setList} />
        <TodoDetail selectId={selectId} />
      </div>
    </div>
  );
};

export default TodoPage;
