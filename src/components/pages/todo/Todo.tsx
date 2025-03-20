import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../../../images/todo_icon.png";
import TodoItems from "./TodoItems";
import { motion } from "framer-motion";

interface Task {
  id: number;
  text: string;
  isComplete: boolean;
  assignedTo: string;
  assignedBy: string;
}

const roles = ["User", "Guest"];

const Todo = () => {
  const [todoList, setTodoList] = useState<Task[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dateTime, setDateTime] = useState("");
  const [assignedUser, setAssignedUser] = useState("");

  const userRole = localStorage.getItem("userRole") || "Guest";

  const completedCount = todoList.filter((todo) => todo.isComplete).length;
  const totalTodos = todoList.length;
  const progress = totalTodos > 0 ? (completedCount / totalTodos) * 100 : 0;

  useEffect(() => {
    const storedTasks = localStorage.getItem("todos");
    if (storedTasks) {
      try {
        setTodoList(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Error parsing tasks:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedTasks = localStorage.getItem("todos");
      if (updatedTasks) {
        setTodoList(JSON.parse(updatedTasks));
      }
    };

window.addEventListener("storage", handleStorageChange);
return () => {
  window.removeEventListener("storage", handleStorageChange);
};
  }, []);

  const addTask = () => {
    const inputText = inputRef.current?.value.trim();
    if (!inputText) return alert("Task cannot be empty");

const newTask: Task = {
  id: Date.now(),
  text: inputText,
  isComplete: false,
  assignedTo: assignedUser || userRole,
  assignedBy: userRole,
};

const updatedTasks = [...todoList, newTask];
setTodoList(updatedTasks);
localStorage.setItem("todos", JSON.stringify(updatedTasks));

if (inputRef.current) inputRef.current.value = "";
setAssignedUser("");
  };

  const deleteTask = (id: number) => {
    const updatedTasks = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTasks);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  };

  const toggleTask = (id: number) => {
    const updatedTasks = todoList.map((todo) =>
      todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodoList(updatedTasks);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  };

  const editTask = (id: number, newText: string) => {
    const updatedTasks = todoList.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodoList(updatedTasks);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  };

  const filteredTasks = todoList.filter((task) => {
    if (userRole === "Admin" || userRole === "Manager") {
      return true;
    }
    return task.assignedTo.toLowerCase() === userRole.toLowerCase();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black text-white">
      <div className="bg-black to-gray-400 w-11/12 h-full max-w-4xl flex flex-col p-2 min-h-[450px] rounded-xl shadow-lg">
        
        <div className="flex flex-col items-center mt-1">
          <div className="flex items-center space-x-2">
            <img className="w-8" src={todo_icon} alt="To-Do Icon" />
            <h1 className="text-3xl font-semibold">To-Do List</h1>
          </div>
          <h2 className="font-semibold text-2xl mt-3 text-center">{dateTime}</h2>
        </div>

    
    <div className="my-6 px-4">
      <p className="text-lg font-semibold text-center">
        Progress: {Math.round(progress)}%
      </p>
      <div className="mx-auto mt-4 w-full sm:w-8/12 bg-gray-300 h-3 rounded-full">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="bg-green-500 h-full rounded-full"
        />
      </div>
    </div>

   
    {(userRole === "Admin" || userRole === "Manager") && (
      <div className="flex flex-col sm:flex-row justify-center my-7 mt-3 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center bg-gray-300 rounded-lg max-w-lg w-full h-10 px-4">
          <input
            ref={inputRef}
            className="bg-transparent border-0 outline-none flex-1 h-full text-lg text-black placeholder-gray-400"
            type="text"
            placeholder="Add your task"
          />
          <select
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
            className="border-gray-400 border-solid bg-gray-300 text-black p-1 rounded-lg ml-2"
          >
            <option value="">Assign to..</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={addTask}
          className="bg-orange-600 w-full sm:w-44 h-10 text-white text-lg font-medium rounded-lg hover:bg-orange-700 transition-colors"
        >
          Add Task
        </button>
      </div>
    )}

    
    <div className="flex-1 overflow-y-auto mt-4">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TodoItems
            key={task.id}
            {...task}
            deleteTodo={deleteTask}
            toggle={toggleTask}
            editTodo={editTask}
          />
        ))
      ) : (
        <p className="text-center text-lg font-medium text-gray-400 mt-4">
          No tasks assigned to you.
        </p>
      )}
    </div>
  </div>
</div>
  );
};

export default Todo;