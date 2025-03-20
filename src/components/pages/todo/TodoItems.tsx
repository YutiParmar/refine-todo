import React, { useState } from "react";
import tick from "../../../images/tick.png";
import not_tick from "../../../images/not_tick.png";
import delete_icon from "../../../images/delete.png";
import edit_icon from "../../../images/edit.png";

const TodoItems = ({
  text,
  id,
  isComplete,
  assignedTo,
  deleteTodo,
  toggle,
  editTodo,
}: {
  text: string;
  id: number;
  isComplete: boolean;
  assignedTo: string;
  deleteTodo: (id: number) => void;
  toggle: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
}) => {
const [isEditing, setIsEditing] = useState(false);
const [newText, setNewText] = useState(text);
const handleSave = () => {
    editTodo(id, newText); // Update todo text
    setIsEditing(false);
  };

  

  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => toggle(id)}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img src={isComplete ? tick : not_tick} alt="" className="w-7" />
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border-solid rounded-md text-[20px] w-full h-11 ml-4 pl-4"
          />
        ) : (
          <p
            className={`text-grey-800 font-semibold ml-4 text-[24px] ${
              isComplete ? "line-through" : ""
            }`}
          >
            {text}{" "}
            <span className="text-sm text-gray-500">({assignedTo})</span>
          </p>
        )}
      </div>

      {/* Edit Button */}
      {isEditing ? (
        <button onClick={handleSave} className="px-3 py-1 bg-green-500 text-white rounded-md">
          Save
        </button>
      ) : (
        <img onClick={() => setIsEditing(true)} src={edit_icon} alt="Edit" className="w-7 cursor-pointer hover:scale-110 transition"  style={{ filter: "invert(100%)" }}/>
      )}

     
        <img onClick={() => deleteTodo(id)} src={delete_icon} alt="" className="w-7 cursor-pointer hover:scale-110 transition"  style={{ filter: "invert(100%)" }}/>
    </div>
  );
};

export default TodoItems;
