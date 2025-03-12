import { CheckSquare, Calendar, LogOut } from "lucide-react";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

export default function Sidebar() {
  return (
    <div>
      <div className="w-full h-16 bg-slate-500"></div>
      <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4 mt-0">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <SidebarItem icon={<CheckSquare size={20} />} label="Todo" />
          <SidebarItem icon={<Calendar size={20} />} label="Calendar" />
          <SidebarItem icon={<LogOut size={20} />} label="Logout" />
        </nav>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg text-black hover:bg-gray-700 hover:text-white transition"
      )}
    >
      {icon}
      {label}
    </Button>
  );
}
