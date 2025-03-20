import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white w-64 h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <button onClick={handleLogout} className="mt-4 bg-red-600 px-3 py-2 rounded text-white w-full">
        Logout
      </button>
    </div>
  );
}
