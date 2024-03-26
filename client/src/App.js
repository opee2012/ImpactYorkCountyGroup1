import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

// styles
import "./styles/App.css";

// Pages and Components
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Edit from "./pages/Edit";
import ChangePasswordForm from "./pages/Password";
import UserManagement from "./pages/userManagement";

function App() {
  const { state } = useAuthContext();
  const { email } = state || {};

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/edit/:subcategory" Component={Edit} />
          <Route path="/password" element={!email ? <Login /> : <ChangePasswordForm />} />
          <Route path="/login" element={!email ? <Login /> : <Navigate to="/" />} />
          <Route path="/user-management" element={!email ? <Login /> : <UserManagement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
