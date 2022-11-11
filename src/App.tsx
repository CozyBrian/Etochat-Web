import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AnimatePresence } from "framer-motion";

import HomeScreen from "./views/home";
import LobbyScreen from "./views/lobby";
import OnCallScreen from "./views/onCall";
import WaitingScreen from "./views/waiting";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { action } from "./redux";
import Peer from "peerjs";

const socket = io("192.168.11.34:3001");
const peer = new Peer({
  host: "192.168.11.34",
  port: 3001,
  path: "/peer",
  debug: 3,
  config: {
    iceServers: [
      { url: "stun:stun01.sipphone.com" },
      { url: "stun:stun.ekiga.net" },
      { url: "stun:stunserver.org" },
      { url: "stun:stun.softjoys.com" },
      { url: "stun:stun.voiparound.com" },
      { url: "stun:stun.voipbuster.com" },
      { url: "stun:stun.voipstunt.com" },
      { url: "stun:stun.voxgratia.org" },
      { url: "stun:stun.xten.com" },
      {
        url: "turn:192.158.29.39:3478?transport=udp",
        credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        username: "28224511:1379330808",
      },
      {
        url: "turn:192.158.29.39:3478?transport=tcp",
        credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        username: "28224511:1379330808",
      },
    ],
  },
});

function App() {
  const dispatch = useDispatch();

  const AudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    socket.on("connect", () => {
      dispatch(action.call.setIsConnected(true));
      console.log("IN");
      console.log(socket.id);
    });

    peer.on("open", function (id) {
      console.log("My peer ID is: " + id);
    });

    return () => {
      socket.off("connect");
      peer.off("open");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const location = useLocation();
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-50">
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route
            path="/"
            element={<HomeScreen socket={socket} peer={peer} />}
          />
          <Route
            path="/loading"
            element={
              <WaitingScreen socket={socket} peer={peer} audioRef={AudioRef} />
            }
          />
          <Route
            path="/on-call"
            element={<OnCallScreen audioRef={AudioRef} />}
          />
          <Route path="/lobby" element={<LobbyScreen />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
