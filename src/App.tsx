import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import Dashboard from "./components/pages/Dashboard";
import Todo from "./components/pages/todo/Todo";
import Calendar from "./components/pages/Calender";
import Board from "./components/pages/Board";
import LogoutSuccessful from "./components/pages/Logout";
import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/pages/Login";

// Function to check if user is authenticated
const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  if (!user) return false; // No user found, block access

  try {
    const parsedUser = JSON.parse(user);
    const allowedRoles = ["Admin", "User", "Manager", "Guest"];
    return parsedUser?.role && allowedRoles.includes(parsedUser.role);
  } catch (error) {
    return false; // If parsing fails, treat as unauthenticated
  }
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

function App() {
  const API_URL = "https://api.nestjsx-crud.refine.dev";
  const dataProvider = nestjsxCrudDataProvider(API_URL);

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            dataProvider={dataProvider}
            routerProvider={routerBindings}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "U8VA2H-miRUnV-Ac064y",
            }}
          >
            <Routes>
              <Route path="/" element={<Login />} />
              {/* Protected Dashboard Routes */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route path="todo" element={<Todo />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="board" element={<Board />} />
              </Route>

              {/* Standalone logout success page */}
              <Route path="/logout-success" element={<LogoutSuccessful />} />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/"/>} />
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          <DevtoolsPanel />
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
