import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// styles
import "./styles/App.css";

// Pages and Components
import Dashboard from "./pages/ReadFromMongo";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import UserManagement from "./pages/userManagement"
function App() {
  const { username } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-management" element={!username ? <Login /> : <UserManagement />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route
            path="/login"
            element={!username ? <Login /> : <Navigate to="/upload" />}
          />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
