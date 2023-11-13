import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Login from "./Login";
import Upload from "./Upload";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Upload" element={<Upload />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
