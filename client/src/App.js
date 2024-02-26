import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// styles
import "./styles/App.css";

// Pages and Components
import Dashboard from "./pages/ReadFromMogo";
import Login from "./pages/Login";
import Upload from "./pages/Upload";


function App() {
  const { username } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route 
              path="/login" 
              element={!username ? <Login /> : <Navigate to="/upload" />} 
            />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;