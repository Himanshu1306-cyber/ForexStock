import { useState } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
 import Chart from "./Components/Chart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chart/:symbol" element={<Chart />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

