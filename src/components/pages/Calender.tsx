import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "../ui/dialog";
import { Textarea } from "../ui/textarea";

interface Task {
  date: string;
  title: string;
  description: string;
  reminder: string;
}

export default function CalendarComponent() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  const addTask = () => {
    if (!taskTitle.trim()) return;
    if (!selectedDate) return;
    
    const newTask: Task = {
      date: selectedDate.toDateString(),
      title: taskTitle,
      description: taskDescription,
      reminder: reminderTime,
    };
    
    setTasks([...tasks, newTask]);
    setTaskTitle("");
    setTaskDescription("");
    setReminderTime("");
  };

  return (
    <div className="w-screen flex flex-col items-center justify-center bg-black p-6">
      <h2 className="text-white text-3xl font-bold mb-6">Task Calendar</h2>
      
      {/* Calendar Section */}
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Select a Date</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Calendar 
            mode="single" 
            selected={selectedDate} 
            onSelect={setSelectedDate} 
            className="w-full max-w-lg" 
          />
          {selectedDate && <p className="mt-4 text-lg font-medium">Selected Date: {selectedDate.toDateString()}</p>}
        </CardContent>
      </Card>

      {/* Add Task Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6">Add Task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add Task for {selectedDate?.toDateString()}</DialogTitle>
          <Input 
            placeholder="Task Title" 
            value={taskTitle} 
            onChange={(e) => setTaskTitle(e.target.value)} 
          />
          <Textarea 
            placeholder="Task Description" 
            value={taskDescription} 
            onChange={(e) => setTaskDescription(e.target.value)} 
          />
          <Input 
            type="time" 
            placeholder="Set Reminder" 
            value={reminderTime} 
            onChange={(e) => setReminderTime(e.target.value)} 
          />
          <Button onClick={addTask}>Save Task</Button>
        </DialogContent>
      </Dialog>

      {/* Task List */}
      <Card className="w-full max-w-4xl mt-6">
        <CardHeader>
          <CardTitle>Tasks for {selectedDate?.toDateString()}</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.filter(task => task.date === selectedDate?.toDateString()).length === 0 ? (
            <p className="text-gray-500">No tasks for this date.</p>
          ) : (
            tasks
              .filter(task => task.date === selectedDate?.toDateString())
              .map((task, index) => (
                <div key={index} className="p-4 border-b">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-sm text-red-500">Reminder at: {task.reminder || "Not set"}</p>
                </div>
              ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
