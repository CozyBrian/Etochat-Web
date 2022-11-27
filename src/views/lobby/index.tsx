import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Memoji from "../../assets/images/memojis";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { action } from "../../redux";
import { pageProps } from "../../@types";

const LobbyScreen = ({ socket }: pageProps) => {
  const User = useAppSelector((state) => state.user);
  const [findClicked, setFindClicked] = useState(false);
  const dispatch = useAppDispatch();

  const Navigate = useNavigate();

  useEffect(() => {
    dispatch(action.call.setOnCall(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeMode = () => {
    dispatch(
      action.user.setMode(User.mode === "SHARER" ? "LISTENER" : "SHARER")
    );
  };

  const handleFind = () => {
    if (!findClicked) {
      socket?.emit("make-request", {
        user: { ...User },
      });
      Navigate("/loading");
      setFindClicked(true);
    }
  };

  const handleLogOut = () => {
    Navigate("/");
  };

  const userImage = Memoji.find((item) => item.id === User.profileID);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center p-4 py-12 w-[400px] bg-white rounded-xl shadow-md"
    >
      <img
        className="w-32 h-32 rounded-full mb-1"
        src={userImage?.src}
        alt=""
      />
      <p className="text-lg mb-0">{User.username}</p>
      <p className="text-black/60 text-xs mt-0">{User.mode}</p>
      <div className="flex flex-col w-4/5 gap-2 mt-8">
        <button
          onClick={handleFind}
          className="flex w-full bg-gradient-to-r from-[#5c40ff] to-[#a221ff] active:opacity-80 text-white items-center text-lg justify-center p-2 rounded-full duration-150"
        >
          {`Find a ${User.mode === "LISTENER" ? "sharer" : "listener"}`}
        </button>
        <button
          onClick={handleChangeMode}
          className="flex w-full bg-gradient-to-r from-[#5c40ff] to-[#a221ff] active:opacity-80 text-white  p-0.5 rounded-full duration-150"
        >
          <div className="flex w-full h-full bg-white rounded-full p-1.5 items-center text-lg justify-center">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#5c40ff] to-[#a221ff]">
              {`Become a ${User.mode === "LISTENER" ? "sharer" : "listener"}`}
            </div>
          </div>
        </button>
      </div>
      <div
        onClick={handleLogOut}
        className="fixed right-4 top-3 text-red-500 active:text-red-700 cursor-pointer select-none "
      >
        Logout
      </div>
    </motion.div>
  );
};

export default LobbyScreen;
