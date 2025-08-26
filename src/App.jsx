import { useState } from "react";
import "./App.css";
import { Home } from "./pages/public/Home";
import { ImobiliariaPage } from "./pages/public/ImobiliariaPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FrameTrackerPage } from "./pages/public/FrameTrackerPage";
import Login from "./pages/public/Login";
import { Dashboard } from "./pages/private/Dashboard";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-[var(--secondary-bg-color)] min-h-screen ">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/imobiliaria" element={<ImobiliariaPage />} />
            <Route path="/frametracker" element={<FrameTrackerPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
