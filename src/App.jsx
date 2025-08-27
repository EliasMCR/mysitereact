import "./App.css";
import { Home } from "./pages/public/Home";
import { ImobiliariaPage } from "./pages/public/ImobiliariaPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FrameTrackerPage } from "./pages/public/FrameTrackerPage";
import Login from "./pages/public/Login";
import { DashboardLayout } from "./pages/private/dashboard/DashboardLayout";
import { PrivateRoute } from "./routes/PrivateRoute";

// Páginas do dashboard
import { CriarImovel } from "./pages/private/dashboard/CriarImovel";
import { ListarImovel } from "./pages/private/dashboard/ListarImovel";
import { EditarImovel } from "./pages/private/dashboard/EditarImovel";
import { ConfigImobiliaria } from "./pages/private/dashboard/ConfigImobiliaria";

function App() {
  return (
    <div className="bg-[var(--secondary-bg-color)] min-h-screen">
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/imobiliaria" element={<ImobiliariaPage />} />
          <Route path="/frametracker" element={<FrameTrackerPage />} />
          <Route path="/login" element={<Login />} />
          {/* Rotas privadas */}
          // App.jsx
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path="criar" element={<CriarImovel />} />
            <Route path="listar" element={<ListarImovel />} />
            <Route path="editar/:id?" element={<EditarImovel />} />
            <Route path="config" element={<ConfigImobiliaria />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
