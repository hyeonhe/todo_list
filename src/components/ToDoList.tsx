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

interface ICategory {
  newCategory: string;
}

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
    <div>
      <h1>To Dos</h1>
      <hr />
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
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
