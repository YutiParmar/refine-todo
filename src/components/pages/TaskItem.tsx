import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface TaskItemProps {
    task: { id: string; task: string; description: string; assignee: string };
    status: string;
    deleteTask: (status: string, id: string) => void;
}

export default function TaskItem({ task, status, deleteTask }: TaskItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task.id,
        data: { ...task }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div 
            ref={setNodeRef} 
            {...attributes} 
            {...listeners} 
            style={style} 
            className="p-2 bg-white shadow rounded-md cursor-grab"
        >
            <CardContent>
                <p className="font-semibold">{task.task}</p>
                <p className="text-sm">{task.description}</p>
                <p className="text-xs text-gray-600">Assigned to: {task.assignee}</p>
                <Button variant="destructive" onClick={() => deleteTask(status, task.id)}>Delete</Button>
            </CardContent>
        </div>
    );
}
