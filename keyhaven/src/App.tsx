import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from './LandingPage/LandingPage';
import './App.css';
import { Dashboard } from "./Dashboard/Dashboard";
import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";

function App() {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <BrowserRouter>
      <Dialog open={isVisible}>
        <DialogTitle onClick={() => setIsVisible(false)}>Expiring Soon</DialogTitle>
      </Dialog>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
