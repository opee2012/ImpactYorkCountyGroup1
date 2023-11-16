import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// styles
import "./styles/App.css";

// Pages and Components
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Upload from "./pages/Upload";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;