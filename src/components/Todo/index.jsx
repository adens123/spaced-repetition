import { useState } from "react";
import "./todo.css";

const Todo = ({
  reviewDate,
  subject,
  contentId,
  content,
  todoIsDone,
  allTodos,
  setTodos
}) => {
  const [isDone, setIsDone] = useState(todoIsDone);
  let newAllTodos = JSON.parse(JSON.stringify(allTodos));
  const emoji = "📝";

  function handleDelete(contentId) {
    newAllTodos.forEach(item => {
      item.todos = item.todos.filter(todo => todo.contentId !== contentId);
    });

    newAllTodos = newAllTodos.filter(item => item.todos.length > 0);

    setTodos(newAllTodos);
  }

  function handleIsDone() {
    setIsDone(!isDone);
    newAllTodos.forEach(item => {
      item.todos.forEach(todo => {
        if (
          item.reviewDate === reviewDate &&
          todo.subject === subject &&
          todo.content === content
        ) {
          todo.isDone = !todo.isDone;
        }
      });
    });
    setTodos(newAllTodos);
  }

  return (
    <div>
      <p
        style={{
          padding: "0px",
          lineHeight: "38px"
        }}>
        <svg
          style={{
            color: isDone ? "#ba4949" : "#dfdfdf",
            paddingRight: "4px",
            position: "relative",
            top: "6px"
          }}
          onClick={handleIsDone}
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-check-circle-fill"
          viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
        <span
          style={{
            color: isDone ? "#dfdfdf" : "#555",
            textDecoration: isDone ? "line-through" : "none"
          }}>
          <span style={{ fontWeight: "bold" }}>{subject}</span> - {content}
        </span>

        {subject.startsWith(emoji) ? (
          <>
            <svg
              onClick={() =>
                confirm("確定要刪除嗎?!") && handleDelete(contentId)
              }
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-x-square-fill"
              viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
            </svg>
          </>
        ) : null}
      </p>
    </div>
  );
};

export default Todo;
