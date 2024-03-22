import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// styles
import "./styles/App.css";

// Pages and Components
import Dashboard from "./pages/ReadFromMongo";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Edit from "./pages/Edit";
import UserManagement from "./pages/userManagement"
function App() {
  const { email } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-management" element={!email ? <Login /> : <UserManagement />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route
            path="/login"
            element={!email ? <Login /> : <Navigate to="/upload" />}
          />
          <Route path="/upload" element={<Upload />} />
          <Route path="/edit/:name" Component={Edit} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
