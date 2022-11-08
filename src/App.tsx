import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AnimatePresence } from "framer-motion";

import HomeScreen from "./views/home";
import LobbyScreen from "./views/lobby";
import OnCallScreen from "./views/onCall";
import WaitingScreen from "./views/waiting";

function App() {
  const location = useLocation();
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-50">
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/loading" element={<WaitingScreen />} />
          <Route path="/on-call" element={<OnCallScreen />} />
          <Route path="/lobby" element={<LobbyScreen />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
