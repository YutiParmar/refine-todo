import { useState } from "react";
import { useNavigate } from "react-router-dom";

const roles: readonly string[] = ["Admin", "User", "Manager", "Guest"];

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.trim() && role) {
      try {
        // 1. Fetch users
        const userRes = await fetch("http://localhost:3001/users");
        const users = await userRes.json();
  
        // 2. Try to find existing user
        let user = users.find((u: any) => u.username === username);
  
        if (!user) {
          // 3. Create new user with unique id
          const newUser = {
            id: Math.random().toString(36).substring(2, 8),
            username,
            role,
          };
  
          const saveUser = await fetch("http://localhost:3001/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          });
  
          if (!saveUser.ok) throw new Error("Failed to save user");
  
          user = newUser;
        }
  
        // 4. Check roles endpoint
        const rolesRes = await fetch("http://localhost:3001/roles");
        const roleList = await rolesRes.json();
  
        const existingRole = roleList.find((r: any) => r.id === user.id);
  
        if (!existingRole) {
          const saveRole = await fetch("http://localhost:3001/roles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: user.id, role }),
          });
  
          if (!saveRole.ok) throw new Error("Failed to save role");
        }
  
        // 5. Store data in localStorage and redirect
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userRole", role);
        localStorage.setItem("username", username);
        navigate("/dashboard/todo");
      } catch (error) {
        console.error("Error:", error);
        alert("Error logging in. Try again.");
      }
    } else {
      alert("Please enter a valid username and select a valid role.");
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-slate-800">
      <div className="bg-black p-6 rounded-lg shadow-lg w-96">
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
              <option key={r} value={r} className="text-gray-300">
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
