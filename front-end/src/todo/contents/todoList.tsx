import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type ListPropsType = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setSelectId: Function;
  list: TodoDataType[];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setList: Function;
};

type TodoDataType = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

const TodoList = ({ setSelectId, list, setList }: ListPropsType) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/todos", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((result) => {
        const data = result.data.data;
        setList(data);
        if (data.length > 0) {
          setSelectId(data[0].id);
        }
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
          <div key={li.id} className="todo" onClick={() => setSelectId(li.id)}>
            <span>{li.title}</span>
            {/* <input type="button" value="a" />
            <input type="button" value="b" /> */}
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
