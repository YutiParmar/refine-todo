import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface Reminder {
  date: string;
  text: string;
}

export default function FullPageCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [reminderText, setReminderText] = useState("");

  const addReminder = () => {
    if (!selectedDate || !reminderText.trim()) return;

    const newReminder: Reminder = { date: format(selectedDate, "PPP"), text: reminderText };
    setReminders([...reminders, newReminder]);
    setReminderText("");
  };

  const deleteReminder = (indexToDelete: number) => {
    setReminders(reminders.filter((_, index) => index !== indexToDelete));
  };

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white pb-6">
      <h1 className=" bg-black text-3xl">Calendar</h1>
      <div className="w-full max-w-7xl bg-black p-4 rounded-lg shadow-lg">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="w-full"
          classNames={{
            months: "flex flex-col items-center",
            month: "w-full",
            caption: "text-2xl font-bold text-center mb-4",
            table: "w-full border-collapse",
            head_row: "grid grid-cols-7 text-lg font-semibold text-gray-300",
            head_cell: "p-3 text-center",
            row: "grid grid-cols-7",
            cell: "h-24 w-24 flex flex-col items-center justify-center text-xl font-medium cursor-pointer rounded-lg hover:bg-gray-700 transition relative",
            day_selected: "bg-blue-600 text-white",
            day_today: "bg-green-600 text-white",
            day_outside: "text-gray-500",
          }}
          formatters={{
            formatWeekdayName: (day) => format(day, "EEEE"), // Full weekday names
          }}
        />
      </div>

      <p className="mt-1 text-lg">Selected Date: {selectedDate ? format(selectedDate, "PPP") : "None"}</p>

      {/* Reminder Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">Add Reminder</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add Reminder for {selectedDate ? format(selectedDate, "PPP") : "None"}</DialogTitle>
          <Textarea 
            placeholder="Enter reminder..." 
            value={reminderText} 
            onChange={(e) => setReminderText(e.target.value)} 
          />
          <Button onClick={addReminder}>Save Reminder</Button>
        </DialogContent>
      </Dialog>

      {/* Display Reminders Under Each Date */}
      <div className="mt-6 w-full max-w-6xl">
        {reminders.length === 0 ? (
          <p className="text-gray-400 text-center">No reminders set.</p>
        ) : (
          reminders.map((reminder, index) => (
            <div key={index} className="p-4 border-b bg-gray-800 rounded-lg mt-2 flex justify-between items-center">
              <div>
                <p className="text-xl font-semibold">{reminder.date}</p>
                <p className="text-gray-300">{reminder.text}</p>
              </div>
              <Button variant="destructive" onClick={() => deleteReminder(index)}>Delete</Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
