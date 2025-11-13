import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TasksProvider } from "./Context/TasksContext.jsx";
import HomePage from "./pages/Home.jsx";
import CreateTaskPage from "./pages/CreateTask.jsx";

import "./App.css";

function App() {
  return (
    <TasksProvider>
      <BrowserRouter>
        <div className="app-container">
          <header className="header">
            <h1 className="app-title">🐾 TodoFlow</h1>
            <p className="app-subtitle">让每一天都轻盈又有序 💛</p>
          </header>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateTaskPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TasksProvider>
  );
}

export default App;
