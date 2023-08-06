import React from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

const calculateDaysLeft = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const timeDiff = due - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft;
};

const TodoList = ({ tasks, toggleTaskStatus }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`todo-item-container ${task.done ? "done" : ""}`}
        >
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTaskStatus(task.id)}
          />
          <div className="item-title">{task.text}</div>
          {task.dueDate && (
            <div className="due-date small-text">
              Due: {task.dueDate} ({calculateDaysLeft(task.dueDate)} days left)
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
