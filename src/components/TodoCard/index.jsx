import Todo from "../Todo";

const TodoCard = ({ reviewDate, todos, allTodos, setTodos, handleModal }) => {
  return (
    <div
      style={{
        backgroundColor:
          reviewDate ===
          new Date().toLocaleDateString("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          })
            ? "#888"
            : "#444",
        padding: "8px 8px 16px 8px",
        borderRadius: "8px"
      }}>
      <h3
        style={{
          borderBottom: "1px solid #fff",
          padding: "8px",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px"
        }}>
        {reviewDate}
        <span
          style={{
            color: "white",
            backgroundColor: "#373737",
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
