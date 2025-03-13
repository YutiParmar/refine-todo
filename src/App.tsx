import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import Login from "./components/pages/Login"
import CalendarComponent from "./components/pages/Calender";
import TaskTemplate from "./components/pages/Board";
import TodoApp from "./components/pages/todo/Todo"


import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";

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
            <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/board" element={<TaskTemplate/>} />
          <Route path="/calender" element={<CalendarComponent/>} />
          <Route path="/todo" element={<TodoApp/>} />
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
