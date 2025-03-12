import { useState } from "react";
 import { useNavigate } from "react-router-dom";
const roles : readonly string[]= ["Admin", "User", "Manager", "Guest"];


export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();
  

  const handleLogin = () => {
    if (username.trim() && roles) {
      localStorage.setItem("userRole", role); // Store role as it is
      localStorage.setItem("username", username);
      localStorage.setItem("user",JSON.stringify({username,role}));
      navigate("/task"); // Redirect to the To-Do app

    } else {
      alert("Please enter a valid username and select a valid role.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
    <h2 className="text-2xl font-bold text-center mb-4 text-white">Login</h2>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400">Username</label>
      <input
        type="text"
        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400">Role</label>
      <select
        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">Select Role</option>
        {roles.map((r) => (
          <option key={r} value={r} className="text-gray-900">
            {r}
          </option>
        ))}
      </select>
    </div>

    <button
      className="w-full mt-4 bg-gray-600 text-white py-2 rounded hover:bg-gray-500"
      onClick={handleLogin}
    >
      Login
    </button>
  </div>
</div>

  );
}
