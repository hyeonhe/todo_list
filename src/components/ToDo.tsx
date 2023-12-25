import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, categoryListState, toDoState } from "../atoms";
import Button from "../UI/Button";
import { styled } from "styled-components";

const ButtonEl = styled.button`
  width: auto;
  height: 100%;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-left: 4px;
  font-size: 12px;
  cursor: pointer;
  background-color: #f8ffae;
  /* box-shadow: 0 4px 30px rgba(35, 35, 35, 0.1); */
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
  /* color: grey; */
`;

const ToDoLi = styled.li`
  /* width: 540px; */
  height: 50px;
  padding: 10px 12px 10px 20px;
  /* padding: 10px 20px; */
  background-color: white;
  color: black;
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 12px;
  /* box-shadow: 0 4px 30px rgba(35, 35, 35, 0.1); */
`;

const Buttons = styled.div`
  display: flex;
  height: 100%;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categoryList = useRecoilValue(categoryListState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name };
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("todos", JSON.stringify(newToDos));
      return newToDos;
    });
  };

  const deleteCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("todos", JSON.stringify(newToDos));

      return newToDos;
    });
  };

  return (
    <ToDoLi>
      <span>{text}</span>
      <Buttons>
        {category !== Categories.DOING && (
          <ButtonEl name={Categories.DOING} onClick={onClick}>
            Doing
          </ButtonEl>
        )}
        {category !== Categories.TO_DO && (
          <ButtonEl name={Categories.TO_DO} onClick={onClick}>
            To Do
          </ButtonEl>
        )}
        {category !== Categories.DONE && (
          <ButtonEl name={Categories.DONE} onClick={onClick}>
            Done
          </ButtonEl>
        )}
        {categoryList.map(
          (value, index) =>
            category !== value && (
              <ButtonEl name={value} onClick={onClick} key={index}>
                {value}
              </ButtonEl>
            )
        )}
        <ButtonEl onClick={deleteCategory}>Delete</ButtonEl>
      </Buttons>
    </ToDoLi>
  );
}

export default ToDo;
