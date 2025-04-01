import { Navigate } from "react-router-dom";

// Function to check if user is authenticated
const isAuthenticated = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    console.log("User not found in localStorage. Redirecting to login...");
    return false;
  }

  try {
    const parsedUser = JSON.parse(user);
    const allowedRoles = ["Admin", "User", "Manager", "Guest"];

    if (parsedUser?.role && allowedRoles.includes(parsedUser.role)) {
      console.log("User authenticated:", parsedUser);
      return true;
    } else {
      console.log("User role is not authorized:", parsedUser);
      return false;
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
    return false;
  }
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
