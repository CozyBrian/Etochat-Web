import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProfileBubble from "../../components/profileBubbles";
import { useAppSelector } from "../../hooks";
import initCall from "../../services";

const WaitingScreen = () => {
  const User = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    initCall(0, 10000)
      .then(() => {
        navigate("/on-call");
      })
      .catch((error) => {
        navigate("/");
        console.log(error);
      });
    console.log("waiting screen");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      </div>
    </motion.div>
  );
};

export default WaitingScreen;
