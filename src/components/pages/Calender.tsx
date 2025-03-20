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
    setReminders([...reminders, { date: format(selectedDate, "PPP"), text: reminderText }]);
    setReminderText("");
  };

  const deleteReminder = (indexToDelete: number) => {
    setReminders(reminders.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white p-2">
      <h1 className="text-md font-bold mb-2 ml-7 text-gradient-to-r from-white to-slate-600 ">Calendar</h1>

      <div className="w-full max-w-md p-2 rounded-lg shadow-lg">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="w-full"
          classNames={{
            months: "flex flex-col items-center",
            month: "w-full",
            caption: "text-sm font-semibold text-center mb-1",
            table: "w-full border-collapse",
            head_row: "grid grid-cols-7 text-xs font-semibold text-gray-300",
            head_cell: "p-1 text-center",
            row: "grid grid-cols-7",
            cell: "h-10 w-10 flex flex-col items-center justify-center text-xs font-medium cursor-pointer rounded-lg hover:bg-gray-700 transition",
            day_selected: "bg-blue-600 text-white",
            day_today: "bg-green-600 text-white",
            day_outside: "text-gray-500",
          }}
        />
      </div>

      <p className="mt-1 text-xs">Selected Date: {selectedDate ? format(selectedDate, "PPP") : "None"}</p>

      {/* Reminder Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-1 text-xs px-1 py-0.5">Add Reminder</Button>
        </DialogTrigger>
        <DialogContent className="max-w-xs">
          <DialogTitle className="text-xs">Add Reminder for {selectedDate ? format(selectedDate, "PPP") : "None"}</DialogTitle>
          <Textarea 
            placeholder="Enter reminder..." 
            value={reminderText} 
            onChange={(e) => setReminderText(e.target.value)} 
            className="text-xs p-1 h-12"
          />
          <Button onClick={addReminder} className="text-xs px-1 py-0.5">Save</Button>
        </DialogContent>
      </Dialog>

      {/* Display Reminders */}
      <div className="mt-1 w-screen h-32 max-w-md mb-7 ">
        {reminders.length === 0 ? (
          <p className="text-gray-400 text-center text-xs">No reminders set.</p>
        ) : (
          <div className="max-h-26 overflow-auto">
            {reminders.map((reminder, index) => (
              <div key={index} className="mr-2 ml-4 p-1 mt-1 border-b  bg-slate-300 text-gradient-to-r from-white to-slate-600 rounded-lg flex justify-between items-center text-xs border-solid ">
                <div>
                  <p className="font-medium">{reminder.date}</p>
                  <p className="text-gray-500 font-medium ">{reminder.text}</p>
                </div>
                <Button variant="destructive" onClick={() => deleteReminder(index)} className="text-xs px-2 py-0 bg-white text-black">X</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
