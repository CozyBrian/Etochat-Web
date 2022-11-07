import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import HomeScreen from "./views/home";
import OnCallScreen from "./views/onCall";
import WaitingScreen from "./views/waiting";

function App() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/loading" element={<WaitingScreen />} />
        <Route path="/on-call" element={<OnCallScreen />} />
      </Routes>
    </div>
  );
}

export default App;
