import { useState, useEffect } from "react";
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskItem from "../pages/TaskItem";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const API_URL = "http://localhost:3001/tasks"; // Adjust for your JSON server

export default function TaskBoard() {
    const [tasks, setTasks] = useState<{ [key: string]: any[] }>({
        backlog: [],
        open: [],
        "in-progress": [],
        completed: []
    });
    const [activeTask, setActiveTask] = useState(null);
    const [newTasks, setNewTasks] = useState({
        backlog: { task: "", description: "", assignee: "" },
        open: { task: "", description: "", assignee: "" },
        "in-progress": { task: "", description: "", assignee: "" },
        completed: { task: "", description: "", assignee: "" }
    });

    // Fetch tasks on mount
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                const groupedTasks = { backlog: [], open: [], "in-progress": [], completed: [] };
                data.forEach(task => {
                    if (groupedTasks[task.status]) {
                        groupedTasks[task.status].push(task);
                    }
                });
                setTasks(groupedTasks);
            });
    }, []);

    // Function to add a new task
    const addTask = async (status: string) => {
        const taskDetails = newTasks[status];
        if (taskDetails.task && taskDetails.description && taskDetails.assignee) {
            const newTask = { ...taskDetails, id: Date.now().toString(), status };
            setTasks(prev => ({ ...prev, [status]: [...prev[status], newTask] }));

            // Persist to db.json
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask)
            });

            setNewTasks(prev => ({ ...prev, [status]: { task: "", description: "", assignee: "" } }));
        }
    };

    // Function to delete a task
    const deleteTask = async (status: string, id: string) => {
        setTasks(prevTasks => ({
            ...prevTasks,
            [status]: prevTasks[status].filter(task => task.id !== id)
        }));

        // Delete from db.json
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    };

    // Drag Start Handler
    const onDragStart = (event: any) => {
        setActiveTask(event.active.data.current);
    };

    // Drag End Handler
    const onDragEnd = async (event: any) => {
        setActiveTask(null);
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const fromStatus = Object.keys(tasks).find(status =>
            tasks[status].some(task => task.id === active.id)
        );
        const toStatus = over.id;

        if (fromStatus && toStatus && fromStatus !== toStatus) {
            const taskToMove = tasks[fromStatus].find(task => task.id === active.id);

            if (taskToMove) {
                const updatedTask = { ...taskToMove, status: toStatus };

                setTasks(prev => {
                    const updatedTasks = { ...prev };
                    updatedTasks[fromStatus] = updatedTasks[fromStatus].filter(task => task.id !== active.id);
                    updatedTasks[toStatus] = [...updatedTasks[toStatus], updatedTask];
                    return updatedTasks;
                });

                // Update status in db.json
                await fetch(`${API_URL}/${taskToMove.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedTask)
                });
            }
        }
    };

    return (
        <div>
            <div className="p-4 bg-black text-2xl text-white">Task Board</div>
            <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} collisionDetection={closestCorners}>
                <div className="grid grid-cols-4 gap-4 p-4">
                    {Object.keys(tasks).map((status) => (
                        <Column 
                            key={status} 
                            status={status} 
                            tasks={tasks[status]} 
                            deleteTask={deleteTask}
                            newTasks={newTasks}
                            setNewTasks={setNewTasks}
                            addTask={addTask}
                        />
                    ))}
                </div>
                <DragOverlay>
                    {activeTask ? <TaskItem task={activeTask} status={activeTask.status} deleteTask={deleteTask} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}

function Column({ status, tasks, deleteTask, newTasks, setNewTasks, addTask }) {
    const { setNodeRef } = useDroppable({ id: status });

    return (
        <div ref={setNodeRef} className="p-4 bg-gray-100 rounded-md shadow-md min-h-[300px] flex flex-col">
            <h2 className="font-semibold text-lg mb-2 capitalize">{status.replace("-", " ")}</h2>
            <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} status={status} deleteTask={deleteTask} />
                    ))}
                </div>
            </SortableContext>

            {/* Task input fields */}
            <div className="mt-4 space-y-2">
                <Input
                    placeholder="Task"
                    value={newTasks[status].task}
                    onChange={(e) => setNewTasks(prev => ({ ...prev, [status]: { ...prev[status], task: e.target.value } }))} 
                />
                <Input
                    placeholder="Description"
                    value={newTasks[status].description}
                    onChange={(e) => setNewTasks(prev => ({ ...prev, [status]: { ...prev[status], description: e.target.value } }))} 
                />
                <Input
                    placeholder="Assignee"
                    value={newTasks[status].assignee}
                    onChange={(e) => setNewTasks(prev => ({ ...prev, [status]: { ...prev[status], assignee: e.target.value } }))} 
                />
                <Button onClick={() => addTask(status)}>Add Task</Button>
            </div>
        </div>
    );
}
