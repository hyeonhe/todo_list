import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { styled } from "styled-components";

interface IForm {
  toDo: string;
}

const Form = styled.form`
  display: flex;
  width: 540px;
  margin-bottom: 24px;
`;

const ToDoInput = styled.input`
  background-color: rgba(255, 255, 255, 0.7);
  width: 240px;
  /* opacity: 0.5; */
  border: none;
  /* box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px; */
  /* border-bottom: 1px solid black; */
  padding: 0px 10px;
  border-radius: 8px;
  margin-right: 12px;

  ::placeholder {
    font-size: 16px;
    color: gray;
  }
`;

const AddBtn = styled.button`
  background-color: white;
  width: 52px;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    console.log(toDo);
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <ToDoInput
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <AddBtn>Add</AddBtn>
    </Form>
  );
}

export default CreateToDo;
