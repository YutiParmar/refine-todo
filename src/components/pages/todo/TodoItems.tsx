import React, { useState } from "react";
import tick from '../../../../src/images/tick.png'
import not_tick from '../../../../src/images/not_tick.png'
import delete_icon from '../../../../src/images/delete.png'
import edit_icon from '../../../../src/images/edit.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TodoItems = ({text,id,isComplete,deleteTodo,toggle,editTodo}:{ text: string ,id:number,isComplete:boolean,deleteTodo:(id: number)=> void;toggle: (id: number) =>void ,editTodo: (id: number, newText: string)=>void})=>{
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const handleSave = () => {
    editTodo(id, newText); // Update todo text
    setIsEditing(false);
  };
  return (
<div className='flex items-center my-3 gap-2 '>
<div onClick={() => toggle(id)} className="flex flex-1 items-center cursor-pointer">
    <img src={isComplete?tick:not_tick} alt="" className='w-7' />
    {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border-solid rounded-md text-[20px] w-full h-11 ml-4 pl-4"
          />
        ) 
      : (
    <p className={`text-white font-semibold ml-4 text-[24px] decoration-slate-900
      ${isComplete?"line-through":""}`}>{text}</p>
    )}
</div>
{/* Edit Button */}
{isEditing ? (
        <button
          onClick={handleSave}
          className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Save
        </button>
      ) : (
        <img
          onClick={() => setIsEditing(true)}
          src={edit_icon}
          alt="Edit"
          className="w-7 cursor-pointer hover:scale-110 transition-transform duration-200"
        />
      )}
<img onClick={()=>{deleteTodo(id)}}src={delete_icon} alt="" className='w-7 cursor-pointer contrast-200 brightness-100 shadow-xl hover:scale-110 transition-transform duration-200'/>
    </div>
  
  )
}

export default TodoItems