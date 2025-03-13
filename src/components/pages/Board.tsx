import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const initialTasks = {
    backlog: [],
    open: [],
    "in-progress": [],
    completed: []
};

export default function TaskBoard() {
    const [tasks, setTasks] = useState(initialTasks);
    const [newTask, setNewTask] = useState({ task: "", description: "", assignee: "", status: "backlog" });

    const addTask = (status) => {
        if (newTask.task && newTask.description && newTask.assignee) {
            setTasks({
                ...tasks,
                [status]: [...tasks[status], { ...newTask, id: Date.now() }]
            });
            setNewTask({ task: "", description: "", assignee: "", status: "backlog" });
        }
    };

    const deleteTask = (status, id) => {
        setTasks({
            ...tasks,
            [status]: tasks[status].filter(task => task.id !== id)
        });
    };

    const moveTask = (task, newStatus) => {
        setTasks(prev => {
            const updatedTasks = { ...prev };
            updatedTasks[task.status] = updatedTasks[task.status].filter(t => t.id !== task.id);
            updatedTasks[newStatus] = [...updatedTasks[newStatus], { ...task, status: newStatus }];
            return updatedTasks;
        });
    };

    return (
      <div>
       <div className="p-4 bg-black text-2xl text-white"> Task Board</div>
        <div className="grid grid-cols-4 gap-4 p-4">
            {Object.keys(tasks).map((status) => (
                <div key={status} className="p-4 bg-gray-100 rounded-md shadow-md">
                    <h2 className="font-semibold text-lg mb-2 capitalize">{status.replace("-", " ")}</h2>
                    <div className="space-y-2">
                        {tasks[status].map((task) => (
                            <Card key={task.id} className="p-2">
                                <CardContent>
                                    <p className="font-semibold">{task.task}</p>
                                    <p className="text-sm">{task.description}</p>
                                    <p className="text-xs text-gray-600">Assigned to: {task.assignee}</p>
                                    <div className="flex justify-between mt-2">
                                        <Select onValueChange={(value) => moveTask(task, value)}>
                                            <SelectTrigger className="w-[120px]">
                                                <SelectValue placeholder={task.status} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.keys(tasks).map((s) => (
                                                    <SelectItem key={s} value={s}>{s.replace("-", " ")}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button variant="destructive" onClick={() => deleteTask(status, task.id)}>Delete</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="mt-4 space-y-2">
                        <Input placeholder="Task" value={newTask.task} onChange={(e) => setNewTask({ ...newTask, task: e.target.value })} />
                        <Input placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
                        <Input placeholder="Assignee" value={newTask.assignee} onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })} />
                        <Button onClick={() => addTask(status)}>Add Task</Button>
                    </div>
                </div>
                
            ))}
        </div>
        </div>
    );
}
