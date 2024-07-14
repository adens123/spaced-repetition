import Todo from "../Todo";

const TodoCard = ({ reviewDate, todos, allTodos, setTodos, handleModal }) => {
  return (
    <div
      style={{
        color: "#555555",
        backgroundColor:
          reviewDate ===
          new Date().toLocaleDateString("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          })
            ? "pink"
            : "#fff",
        border: "1px solid #ccc",
        padding: "0 8px",
        borderRadius: "8px"
      }}>
      <h3
        style={{
          borderBottom: "1px solid #639669",
          padding: "8px",
          display: "flex",
          justifyContent: "space-between"
        }}>
        {reviewDate}
        <span
          style={{
            color: "white",
            backgroundColor: "lightblue",
            padding: "0 6px",
            borderRadius: "3px",
            cursor: "pointer"
          }}
          onClick={() => {
            handleModal(true);
          }}>
          +
        </span>
      </h3>

      {todos.map((todo, index) => {
        return (
          <Todo
            key={index}
            reviewDate={reviewDate}
            subject={todo.subject}
            todoId={todo.todoId}
            content={todo.content}
            todoIsDone={todo.isDone}
            allTodos={allTodos}
            setTodos={setTodos}
          />
        );
      })}
    </div>
  );
};

export default TodoCard;
