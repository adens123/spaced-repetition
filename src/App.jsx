import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoCardList from "./components/TodoCardList";
import TodoCard from "./components/TodoCard";
import Modal from "./components/Modal";

function App() {
  const [todos, setTodos] = useState(
    localStorage.getItem("mytodos")
      ? JSON.parse(localStorage.getItem("mytodos"))
      : []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const newTodos = [];
  todos.forEach(todo => {
    todo.reviewDates.forEach((reviewDate, index) => {
      let newSubject = todo.subject;
      if (index == 0) {
        newSubject = "📝" + newSubject;
      }

      const hasReviewDate = newTodos.find(item => {
        if (item.reviewDate === reviewDate.reviewDate) {
          item.todos.push({
            subject: newSubject,
            todoId: todo.todoId,
            content: todo.content,
            isDone: reviewDate.isDone
          });
          return true;
        }
      });

      if (!hasReviewDate) {
        newTodos.push({
          reviewDate: reviewDate.reviewDate,
          todos: [
            {
              subject: newSubject,
              todoId: todo.todoId,
              content: todo.content,
              isDone: reviewDate.isDone
            }
          ]
        });
      }

      newTodos.sort((a, b) => {
        return new Date(a.reviewDate) - new Date(b.reviewDate);
      });
    });
  });

  useEffect(() => {
    localStorage.setItem("mytodos", JSON.stringify(todos));
  }, [todos]);

  function handleModal(isOpen) {
    setIsModalOpen(isOpen);
  }

  return (
    <>
      <div className="main">
        <h1 style={{ margin: "20px 0", textAlign: "center" }}>
          自動化間隔複習清單
        </h1>
        <AddTodo todos={todos} setTodos={setTodos} handleModal={handleModal} />
        <hr style={{ marginTop: "5px", marginBottom: "5px" }} />
        <TodoCardList>
          {newTodos.map((item, index) => {
            return (
              <TodoCard
                key={index}
                reviewDate={item.reviewDate}
                todos={item.todos}
                allTodos={todos}
                setTodos={setTodos}
                handleModal={handleModal}
              />
            );
          })}
        </TodoCardList>
      </div>
      {isModalOpen && (
        <Modal handleModal={handleModal}>
          <AddTodo
            todos={todos}
            setTodos={setTodos}
            handleModal={handleModal}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
