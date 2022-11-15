import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { AnimatePresence } from "framer-motion";

import HomeScreen from "./views/home";
import LobbyScreen from "./views/lobby";
import OnCallScreen from "./views/onCall";
import WaitingScreen from "./views/waiting";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { action } from "./redux";
import Peer, { MediaConnection } from "peerjs";
import { PSUserType } from "./@types";
import { useAppSelector } from "./hooks";

const DEVENV = "192.168.11.34";
// const DEVENVVV = "172.20.10.2";
// const DEVENVV = "localhost";

const socket = io(`${DEVENV}:3001`);
const peer = new Peer({
  host: DEVENV,
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
  const [peerCall, setPeerCall] = useState<MediaConnection>();
  const onCall = useAppSelector((state) => state.call.onCall);
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      dispatch(action.call.setIsConnected(true));
      console.log("IN");
      console.log(socket.id);
    });

    socket.on("on-called", (data) => {
      socket.emit("join-room", data);
    });

    peer.on("open", function (id) {
      console.log("My peer ID is: " + id);
    });

    peer?.on("call", async (call) => {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setPeerCall(call);
      console.log("SENT");
      call.answer(localStream);

      call?.on("stream", (otherStream) => {
        if (audioRef.current) {
          audioRef.current.srcObject = otherStream;
        }
      });

      socket.on("user-disconnected", (data) => {
        console.log(`USER HAS DISCONNECTED - From: ${data}`);
        call?.close();
        if (audioRef.current) {
          audioRef.current.srcObject = null;
        }
        navigate("/lobby");
      });

      call.on("close", () => {
        if (audioRef.current) {
          audioRef.current.srcObject = null;
          localStream.getTracks().forEach((track) => track.stop());
        }
      });
      navigate("/on-call");
    });

    return () => {
      socket.off("connect");
      socket.off("user-disconnected");
      peer.off("call");
      peer.off("open");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const EndCall = () => {
    peerCall?.close();
    if (audioRef.current) {
      audioRef.current.srcObject = null;
    }
    socket.emit("end-call");
  };

  useEffect(() => {
    if (!onCall)
      socket?.on("accepted", async ({ user }: PSUserType) => {
        console.log(`accepted id is ${user.sid}`);
        const localStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const call = peer?.call(user.pid, localStream);
        setPeerCall(call);
        socket.emit("calling", {
          user,
        });

        call?.on("stream", (otherStream) => {
          if (audioRef.current) {
            audioRef.current.srcObject = otherStream;
          }
          console.log("RECIEVED");
        });

        socket.on("user-disconnected", (data) => {
          console.log(`USER HAS DISCONNECTED - From: ${data}`);
          call?.close();
          if (audioRef.current) {
            audioRef.current.srcObject = null;
          }
          navigate("/lobby");
        });

        navigate("/on-call");

        call.on("close", () => {
          if (audioRef.current) {
            audioRef.current.srcObject = null;
          }
        });
      });

    return () => {
      socket?.off("accepted");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCall]);

  const location = useLocation();
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-50">
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route
            path="/"
            element={<HomeScreen socket={socket} peer={peer} />}
          />
          <Route path="/loading" element={<WaitingScreen />} />
          <Route
            path="/on-call"
            element={<OnCallScreen onEnd={() => EndCall()} />}
          />
          <Route
            path="/lobby"
            element={<LobbyScreen socket={socket} peer={peer} />}
          />
        </Routes>
      </AnimatePresence>
      <div className="h-72 hidden">
        <audio ref={audioRef} autoPlay playsInline className="" />
      </div>
    </div>
  );
}

export default App;
