import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { action } from "../../redux";
import { UserGen } from "../../utils";
import ModeSelector from "./components/modeSelector";
import ProfileSelector from "./components/profileselector";
import { pageProps } from "../../@types";

const HomeScreen = ({ socket, peer }: pageProps) => {
  const User = useAppSelector((state) => state.user);
  const [text, setText] = useState(User.username);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (User.username !== "") {
      socket?.emit("make-request", { user: { id: peer?.id, ...User } });
      dispatch(action.user.setUsername(text));
      navigate("/loading");
    } else {
      const username = UserGen();
      dispatch(action.user.setUsername(username));
      setText(username);
    }
  };

  const OnChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    dispatch(action.user.setUsername(event.target.value));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col w-[500px] bg-white rounded-lg shadow-lg p-8"
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col">
          <label>
            Enter a nickname <span className="text-black/50">(optional)</span>
          </label>
          <input
            onChange={OnChangeText}
            value={text}
            className="border-2 border-gray-400 p-2 rounded-lg"
          />
        </div>
        <div className="py-4">
          <ProfileSelector />
        </div>
        <div>
          <ModeSelector />
        </div>
      </div>
      <div className="py-4">
        <button
          onClick={handleSubmit}
          className="flex w-full bg-gradient-to-r from-[#5c40ff] to-[#a221ff] active:opacity-80 text-white items-center text-lg justify-center p-2 rounded-full duration-150"
        >
          {`Find a ${User.mode === "LISTENER" ? "sharer" : "listener"}`}
        </button>
      </div>
    </motion.div>
  );
};

export default HomeScreen;
