import React from "react";
import { useNavigate } from "react-router-dom";
import Memoji from "../../assets/images/memojis";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { action } from "../../redux";

const LobbyScreen = () => {
  const User = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const Navigate = useNavigate();

  const handleChangeMode = () => {
    dispatch(
      action.user.setMode(User.mode === "SHARER" ? "LISTENER" : "SHARER")
    );
  };

  const handleFind = () => {
    Navigate("/loading");
  };

  const handleLogOut = () => {
    Navigate("/");
  };

  const userImage = Memoji.find((item) => item.id === User.profileID);

  return (
    <div className="flex flex-col items-center justify-center p-4 py-12 w-[400px] bg-white rounded-xl shadow-md">
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
    </div>
  );
};

export default LobbyScreen;
