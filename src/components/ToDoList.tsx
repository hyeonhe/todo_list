import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import {
  Categories,
  categoryListState,
  categoryState,
  toDoSelector,
} from "../atoms";
import ToDo from "./ToDo";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";

interface ICategory {
  newCategory: string;
}

const ToDoListArea = styled.div`
  width: 600px;
  height: 600px;
  padding: 32px 0px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(35, 35, 35, 0.1);
  border-radius: 20px;
  /* overflow-y: scroll; */
`;

const List = styled.div`
  padding: 12px 0px;
  width: 540px;
  height: 100%;
  overflow-y: scroll;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };
  const { register, handleSubmit, setValue } = useForm<ICategory>();

  const [categoryList, setCategoryList] = useRecoilState(categoryListState);

  const handleValid = ({ newCategory }: ICategory) => {
    console.log(newCategory);
    setCategoryList([...categoryList, newCategory]);
    setValue("newCategory", "");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "10% 20%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("newCategory", { required: "Write a category" })}
          placeholder="Add a category"
        />
        <button type="submit">Add</button>
      </form>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {categoryList.map((value, index) => (
          <option value={value} key={index}>
            {value}
          </option>
        ))}
      </select>
      <ToDoListArea>
        <CreateToDo />
        <List>
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </List>
      </ToDoListArea>
    </div>
  );
}

export default ToDoList;
