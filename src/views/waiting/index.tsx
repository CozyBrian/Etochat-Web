import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProfileBubble from "../../components/profileBubbles";
import { useAppSelector } from "../../hooks";
import { PSUserType } from "../../@types";
import Peer from "peerjs";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type pageProps = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  peer: Peer;
  audioRef?: React.RefObject<HTMLAudioElement>;
};

const WaitingScreen = ({ socket, peer }: pageProps) => {
  const User = useAppSelector((state) => state.user);
  const audioRef = useRef<HTMLAudioElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    socket?.on("accepted", async ({ user }: PSUserType) => {
      console.log(user.id);
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const call = peer?.call(user.id, localStream);

      call?.on("stream", (otherStream) => {
        if (audioRef.current) {
          audioRef.current.srcObject = otherStream;
        }
        console.log("calllerrrr");
        navigate("/on-call");
      });

      call.on("close", () => {
        if (audioRef.current) {
          audioRef.current.srcObject = null;
        }
      });
    });

    peer?.on("call", async (call) => {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      console.log("receiverrrrrr");
      call.answer(localStream);
      navigate("/on-call");

      socket.on("user-disconnected", () => {
        call.close();
        console.log("Ei");
        navigate("/lobby");
      });
    });

    return () => {
      socket?.off("accepted");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   socket?.on("accepted", ({ user }: PSUserType) => {
  //     // peer?.connect(data.);
  //     console.log(user.id);
  //     const conn = peer?.connect(user.id);

  //     conn?.on("open", () => {
  //       navigate("/on-call");
  //     });
  //   });

  //   peer?.on("connection", (conn) => {
  //     navigate("/on-call");

  //     conn.emit("data", MediaStream);
  //   });

  //   return () => {
  //     socket?.off("accepted");
  //   };
  // }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex justify-center items-center"
    >
      <div className="relative flex justify-center items-center">
        <ProfileBubble />
        <div className="absolute text-center w-56 top-36">
          Connecting you to a {User.mode === "LISTENER" ? "sharer" : "listener"}
          ...
        </div>
        <audio ref={audioRef} autoPlay playsInline className="remote" />
      </div>
    </motion.div>
  );
};

export default WaitingScreen;
