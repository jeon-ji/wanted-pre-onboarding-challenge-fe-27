import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

type DetailPropsType = {
  selectId: string;
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

const TodoDetail = ({
  selectId,
  setSelectId,
  list,
  setList,
}: DetailPropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const editTodo = () => {
    if (data.title === "") return toast.warn("제목을 입력해주세요.");
    if (data.content === "") return toast.warn("내용을 입력해주세요.");

    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:8080/todos/${selectId}`,
        {
          title: data.title,
          content: data.content,
        },
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((result) => {
        const resultData = result.data.data;
        const changeList = list.map((li) => {
          if (li.id === selectId) li = resultData;
          return li;
        });
        setData(resultData);
        setList(changeList);
        setEditMode(false);
        toast.info("TODO 데이터가 수정되었습니다.");
      })
      .catch(() => {
        toast.warn("TODO 데이터 수정에 실패하였습니다.");
      });
  };

  const deleteTodo = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8080/todos/${selectId}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(() => {
        const filterList = list.filter((li) => li.id !== selectId);
        setList(filterList);
        setEditMode(false);
        if (filterList.length > 0) {
          setSelectId(filterList[0].id);
        }
        toast.info("TODO 데이터가 삭제되었습니다.");
      })
      .catch(() => {
        toast.warn("TODO 삭제에 실패하였습니다.");
      });
  };

  return (
    <div className="todo_detail_box">
      <div className="title_box">
        <h2>Todo Detail</h2>
        {!editMode ? (
          <EditIcon className="edit_icon" onClick={() => setEditMode(true)} />
        ) : (
          <CloseIcon className="edit_icon" onClick={() => setEditMode(false)} />
        )}
      </div>
      <div className="detail_box">
        <div className="con_box">
          <label>제목</label>
          <input
            type="text"
            id="title"
            value={data.title}
            disabled={!editMode}
            onChange={onChange}
          />
        </div>
        <div className="con_box">
          <label>내용</label>
          <input
            type="text"
            id="content"
            value={data.content}
            disabled={!editMode}
            onChange={onChange}
          />
        </div>
        <div className="con_box">
          <label>생성일</label>
          <input type="text" value={data.createdAt} disabled />
        </div>
        <div className="con_box">
          <label>수정일</label>
          <input type="text" value={data.updatedAt} disabled />
        </div>
      </div>
      {editMode && (
        <div className="btn_container">
          <input
            type="button"
            className="todo_btn"
            value="수정"
            onClick={editTodo}
          />
          <input
            type="button"
            className="todo_btn"
            value="삭제"
            onClick={deleteTodo}
          />
        </div>
      )}
    </div>
  );
};

export default TodoDetail;
