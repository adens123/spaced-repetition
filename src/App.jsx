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
          {todos.map((item, index) => {
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
