import TodoList from "./contents/todoList";
import TodoDetail from "./contents/todoDetail";
import { useState } from "react";

const TodoPage = () => {
  const [selectId, setSelectId] = useState<string>("");

  return (
    <div className="todo_page">
      <h1>Todo Page</h1>
      <div className="todo_contents">
        <TodoList setSelectId={setSelectId} />
        <TodoDetail selectId={selectId} />
      </div>
    </div>
  );
};

export default TodoPage;
