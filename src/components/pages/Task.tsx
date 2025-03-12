import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "Medium", status: "To Do" });
  const [filterStatus, setFilterStatus] = useState<"All" | "To Do" | "In Progress" | "Completed">("All");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "" });

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status as Task["status"],
      priority: newTask.priority as Task["priority"],
    };
    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", priority: "Medium", status: "To Do" });
  };

  const changeStatus = (id: number, newStatus: Task["status"]) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTask({ title: task.title, description: task.description });
  };

  const saveEdit = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, title: editedTask.title, description: editedTask.description } : task)));
    setEditingTaskId(null);
  };

  const filteredTasks = filterStatus === "All" ? tasks : tasks.filter(task => task.status === filterStatus);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Add Task Section */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Task Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
          <Textarea placeholder="Task Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
          
          {/* Priority Selection */}
          <Select onValueChange={(val: string) => setNewTask({ ...newTask, priority: val })} defaultValue={newTask.priority}>
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Selection */}
          <Select onValueChange={(val: string) => setNewTask({ ...newTask, status: val })} defaultValue={newTask.status}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={addTask} className="w-full">
            Add Task
          </Button>
        </CardContent>
      </Card>

      {/* Filter Tasks Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Filter: {filterStatus}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setFilterStatus("All")}>All</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilterStatus("To Do")}>To Do</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilterStatus("In Progress")}>In Progress</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilterStatus("Completed")}>Completed</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Task Board */}
      <div className="grid grid-cols-3 gap-4">
        {["To Do", "In Progress", "Completed"].map((status) => (
          <div key={status}>
            <h2 className="text-xl font-semibold mb-2">{status}</h2>
            <div className="space-y-3">
              {filteredTasks.filter(task => task.status === status).map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    {editingTaskId === task.id ? (
                      <Input value={editedTask.title} onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })} />
                    ) : (
                      <CardTitle>{task.title}</CardTitle>
                    )}
                  </CardHeader>
                  <CardContent>
                    {editingTaskId === task.id ? (
                      <Textarea value={editedTask.description} onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })} />
                    ) : (
                      <p className="text-sm">{task.description}</p>
                    )}

                    <p className="text-xs mt-2">Priority: <span className={`font-bold ${task.priority === "High" ? "text-red-500" : task.priority === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
                      {task.priority}
                    </span></p>

                    {/* Status Change Button */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-2">Change Status</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => changeStatus(task.id, "To Do")}>To Do</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeStatus(task.id, "In Progress")}>In Progress</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeStatus(task.id, "Completed")}>Completed</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Edit and Delete Buttons */}
                    <div className="mt-3 flex space-x-2">
                      {editingTaskId === task.id ? (
                        <Button size="sm" onClick={() => saveEdit(task.id)}>Save</Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => startEditing(task)}>Edit</Button>
                      )}
                      <Button size="sm" variant="destructive" onClick={() => deleteTask(task.id)}>Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
