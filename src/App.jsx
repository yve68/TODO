import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { TasksProvider } from "./Context/TasksContext.jsx";
import HomePage from "./pages/Home.jsx";
import CreateTaskPage from "./pages/CreateTask.jsx";
import WelcomePage from "./pages/Welcome.jsx";

import "./App.css";

function AppShell() {
  const location = useLocation();
  const isWelcome = location.pathname === "/";
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  const shards = Array.from({ length: 5 });

  return (
    <>
      <div className={`loading-overlay ${isBooting ? "" : "loading-overlay--hide"}`}>
        <div className="loading-overlay__content">
          <p>TODOFLOW</p>
        </div>
        <div className="loading-overlay__shards">
          {shards.map((_, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.12}s` }} />
          ))}
        </div>
      </div>

      <div className="app-container">
        {!isWelcome && (
          <header className="header">
            <h1 className="app-title">🐾 TodoFlow</h1>
          </header>
        )}

        <main className={`card-content ${isWelcome ? "card-content--welcome" : ""}`}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/app" element={<HomePage />} />
            <Route path="/create" element={<CreateTaskPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <TasksProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </TasksProvider>
  );
}

export default App;
