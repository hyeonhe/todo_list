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

const Form = styled.form`
  display: flex;
  width: 540px;
  margin-bottom: 24px;
`;

const CategoryInput = styled.input`
  width: 240px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  padding: 0px 10px;
  border-radius: 8px;
  margin-right: 12px;

  ::placeholder {
    font-size: 16px;
    color: gray;
  }
`;

const AddBtn = styled.button`
  background-color: #f8ffae;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 30px rgba(35, 35, 35, 0.1);
`;

const CategorySelect = styled.select`
  width: 240px;
  height: 24px;
  border: none;
  background-color: none;
  border-radius: 12px;
`;

const CategroyArea = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(35, 35, 35, 0.1);
  width: 600px;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 32px;
`;

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

const Title = styled.h1``;

const List = styled.div`
  padding: 12px 0px;
  width: 540px;
  height: 100%;
  overflow-y: auto;
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
      <CategroyArea>
        <Form onSubmit={handleSubmit(handleValid)}>
          <CategoryInput
            {...register("newCategory", { required: "Write a category" })}
            placeholder="Add a category"
          />
          <AddBtn type="submit">ADD</AddBtn>
        </Form>
        <CategorySelect value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
          {categoryList.map((value, index) => (
            <option value={value} key={index}>
              {value}
            </option>
          ))}
        </CategorySelect>
      </CategroyArea>
      <ToDoListArea>
        <Title>{category}</Title>
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
