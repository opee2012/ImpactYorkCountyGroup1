import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

// styles
import "./styles/App.css";

// Pages and Components
import Dashboard from "./pages/ReadFromMongo";
import Login from "./pages/Login";
import Upload from "./pages/Upload";

function App() {
  const { state } = useAuthContext();
  const { email } = state || {};

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route
            path="/login"
            element={!email ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
