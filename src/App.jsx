import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoCardList from "./components/TodoCardList";
import TodoCard from "./components/TodoCard";

function App() {
  const [todos, setTodos] = useState(
    localStorage.getItem("mytodos")
      ? JSON.parse(localStorage.getItem("mytodos"))
      : []
  );

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

  return (
    <>
      <div className="main">
        <h1 style={{ margin: "20px 0", textAlign: "center" }}>
          自動化間隔複習清單
        </h1>
        <AddTodo todos={todos} setTodos={setTodos} />
        <TodoCardList>
          {newTodos.map((item, index) => {
            return (
              <TodoCard
                key={index}
                reviewDate={item.reviewDate}
                todos={item.todos}
                allTodos={todos}
                setTodos={setTodos}
              />
            );
          })}
        </TodoCardList>
      </div>
    </>
  );
}

export default App;
