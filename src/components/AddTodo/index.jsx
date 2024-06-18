import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import "./addTodo.css";

function getreviewDates(startDate) {
  const days = [1, 2, 4, 8, 15, 30];
  return days.map(day => {
    startDate.setDate(startDate.getDate() + day - 1);
    return startDate.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  });
}

const AddTodo = ({ todos, setTodos }) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const isDone = false;

  function handleAddTodo() {
    // 未輸入主題或內容時不新增
    if (!subject || !content) return;

    const newTodos = JSON.parse(JSON.stringify(todos));
    const reviewDates = getreviewDates(startDate);
    const todoId = uuidv4();

    const newTodo = {
      todoId,
      subject,
      content,
      reviewDates: reviewDates.map(reviewDate => {
        return {
          reviewDate,
          isDone
        };
      })
    };

    newTodos.push(newTodo);
    setTodos(newTodos);

    setStartDate(new Date());
    setSubject("");
    setContent("");
  }

  return (
    <div className="add-todo" style={{}}>
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={startDate}
        onChange={date => setStartDate(date)}
      />
      <input
        onChange={e => {
          setSubject(e.target.value);
        }}
        type="text"
        value={subject}
        placeholder="複習主題"
      />
      <input
        onChange={e => {
          setContent(e.target.value);
        }}
        type="text"
        value={content}
        placeholder="複習範圍"
      />
      <button onClick={handleAddTodo}>新增</button>
    </div>
  );
};

export default AddTodo;
