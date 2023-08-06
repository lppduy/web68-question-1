import React, { useState, useEffect } from "react";
import "./styles.css";
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import Form from "./Form";
import Footer from "./Footer";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks
      ? JSON.parse(storedTasks)
      : [
          {
            id: 1,
            text: "Build some websites",
            done: false,
            dueDate: "2023-09-30"
          },
          { id: 2, text: "Do exercises", done: false, dueDate: "2023-08-30" },
          { id: 3, text: "Go shopping", done: false, dueDate: "2023-08-30" },
          { id: 4, text: "House cleaning", done: true, dueDate: "2023-08-27 " }
        ];
  });

  const [showNotFinishedOnly, setShowNotFinishedOnly] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const withDone = searchParams.get("withDone");

    if (withDone === "1") {
      setShowNotFinishedOnly(false);
    }
  }, [location]);

  // const toggleTaskStatus = (id) => {
  //   const updatedTasks = tasks.map((task) =>
  //     task.id === id ? { ...task, done: !task.done } : task
  //   );
  //   setTasks(updatedTasks);
  // };
  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Lưu vào LocalStorage
  };

  const addTask = (text, dueDate) => {
    const newTask = { id: tasks.length + 1, text, done: false, dueDate };
    setTasks([...tasks, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  const undoneTasks = tasks.filter((task) => !task.done);
  const undoneCount = undoneTasks.length;

  const filteredTasks = showNotFinishedOnly ? undoneTasks : tasks;

  const toggleShowNotFinishedOnly = () => {
    setShowNotFinishedOnly(!showNotFinishedOnly);
    const searchParams = new URLSearchParams(location.search);
    if (!showNotFinishedOnly) {
      searchParams.set("withDone", "1");
    } else {
      searchParams.delete("withDone");
    }
    const newSearch = searchParams.toString();
    const newPath = location.pathname + (newSearch ? `?${newSearch}` : "");

    // Use Link to navigate to the new URL
    return <Link to={newPath} />;
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              tasks={filteredTasks}
              toggleTaskStatus={toggleTaskStatus}
              addTask={addTask}
              undoneCount={undoneCount}
              showNotFinishedOnly={showNotFinishedOnly}
              toggleShowNotFinishedOnly={toggleShowNotFinishedOnly}
            />
          }
        />
      </Routes>
    </div>
  );
}

const Home = ({
  tasks,
  toggleTaskStatus,
  addTask,
  undoneCount,
  showNotFinishedOnly,
  toggleShowNotFinishedOnly
}) => {
  return (
    <LanguageProvider>
      <div className="App">
        <div className="container">
          <TodoListHeader
            tasks={tasks}
            showNotFinishedOnly={showNotFinishedOnly}
            toggleShowNotFinishedOnly={toggleShowNotFinishedOnly}
          />
          <TodoList tasks={tasks} toggleTaskStatus={toggleTaskStatus} />
          <Form addTask={addTask} />
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
};
