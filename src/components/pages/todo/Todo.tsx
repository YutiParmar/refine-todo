import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../../../../src/images/todo_icon.png'
import TodoItems from './TodoItems'
// import { text } from '@fortawesome/fontawesome-svg-core';

const Todo = () => {
const [todoList, setTodoList] = useState<{ id: number; text?: string; isComplete: boolean;}[]>([]);
const inputRef=useRef<HTMLInputElement>(null);
const[dateTime, setDateTime] = useState("");

const completedCount = todoList.filter((todo) => todo.isComplete).length;
const totalTodos = todoList.length;
const progress = totalTodos > 0 ? (completedCount / totalTodos) * 100 : 0;

const add=()=>{
const InputText=inputRef.current?.value.trim();
 if( InputText=="")
 {
  return null;
 }
 const newTodo={ 
    id: Date.now(),
    text:InputText,
    isComplete:false,
 }
 setTodoList((prev)=>[...prev,newTodo]);
 if (inputRef.current) {
  inputRef.current.value = "";
}
    }

    const deleteTodo=(id:number)=>{
      setTodoList((prvTodos)=>{
        return prvTodos.filter((todo)=>todo.id!=id)
      })
    }
 
    const toggle = (id: number) => {
      setTodoList((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isComplete: !todo.isComplete} : todo
        ) 
      );
    };

    const editTodo = (id: number, newText: string) => {
      setTodoList((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
      );
    };
//Todo Date and Time
    setInterval(()=>{
      const now= new Date ();
    const formattedDate= now.toLocaleDateString();
    const formattedTime= now.toLocaleTimeString();
    setDateTime(`${formattedDate}-${formattedTime}`)},1000);

    useEffect(()=>{
     localStorage.setItem("todos", JSON.stringify(todoList));
    },[todoList])
    
  return (
<div className="w-full h-screen flex justify-center items-center overflow-hidden mt-0 bg-black">
<div className='bg-black text-white w-11/12 h-full place-self-center max-w-4xl flex flex-col p-2 min-h-[450px] rounded-xl'>
 {/* --------title------------ */}
<div className="flex flex-col items-center mt-7">
  {/* To-Do List Heading with Icon */}
  <div className="flex items-center space-x-2">
    <img className="w-8" src={todo_icon} alt="To-Do Icon" />
    <h1 className="text-3xl font-semibold">To-Do List</h1>
  </div>

  {/* Date and Time */}
  <h2 className="font-semibold text-2xl mt-3 text-center">{dateTime}</h2>
</div>
{/* ---------Progress Bar--------- */}
<div className="my-6">
          <p className="text-lg font-semibold text-center">Progress: {Math.round(progress)}%</p>
          <div className=" ml-36 mt-4 w-8/12 bg-gray-300 h-5 rounded-full">
            <div
              style={{ width: `${progress}%` }}
              className="bg-green-500 h-full rounded-full"
            ></div>
          </div>
        </div>

{/* ---------input box--------- */}
<div className="flex justify-center my-7 mt-3">
<div className='flex items-center my-6 bg-gray-200 rounded-full max-w-lg w-full h-11'>
    <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-11 w-11 pl-4 pr-4 placeholder:text-slate-600 text-xl' type="text" placeholder='Add your task' />
    <button onClick={add} className='border-none rounded-full bg-orange-600 w-44 h-11 text-white text-2xl font-medium cursor-pointer pl-6'>Add +</button>
</div>
</div>
{/* ---------To do list--------- */}
<div>
  {todoList.map((item,index)=>{
return <TodoItems key={index} text={item.text || "Default Todo"} id={item.id}  isComplete={item.isComplete} editTodo={editTodo} deleteTodo={deleteTodo}  toggle={toggle} />

})}
</div>
    </div> 
    </div>
  )
}

export default Todo