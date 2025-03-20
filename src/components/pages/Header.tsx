
import { Link, useNavigate } from "react-router-dom";
import { CheckSquare, Calendar, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    navigate("/"); 
  };

  return (
    <div className="flex">
      <div className="h-screen w-64 bg-black text-white flex flex-col p-6 shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-600">
            Dashboard
          </h2>
        </div>

    {/* Navigation Items */}
    <nav className="flex flex-col gap-3">
      <SidebarItem icon={<CheckSquare size={20} />} label="Todo" to="/dashboard/todo" />
      <SidebarItem icon={<Calendar size={20} />} label="Calendar" to="/dashboard/calendar" />
      <SidebarItem icon={<LayoutDashboard size={20} />} label="Board" to="/dashboard/board" />
      <SidebarItem icon={<LogOut size={20} />} label="Logout" to="/" />
    </nav>
  </div>
</div>
  );
}

function SidebarItem({
  icon,
  label,
  to,
  onClick,
  noHover,
}: {
  icon: React.ReactNode;
  label: string;
  to?: string;
  onClick?: () => void;
  noHover?: boolean;
}) {
  const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 transform";
  const hoverClasses = noHover ? "" : "hover:bg-gray-700 hover:text-white hover:translate-x-2";
  const textColor = noHover ? "text-gray-900 font-semibold" : "text-gray-300";

  const content = (
    <div className={cn(baseClasses, hoverClasses, textColor)}>
      {icon}
      <span>{label}</span>
    </div>
  );

  return to ? (
    <Link to={to} className="text-gray-300 hover:text-white">
      {content}
    </Link>
  ) : (
    <Button variant="ghost" className="w-full text-left" onClick={onClick}>
      {content}
    </Button>
  );
}