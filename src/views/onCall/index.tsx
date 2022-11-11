import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProfileBubble from "../../components/profileBubbles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { action } from "../../redux";
import CallTimer from "./components/callTimer";

const OnCallScreen = ({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
}) => {
  const CallState = useAppSelector((state) => state.call);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleEndCall = () => {
    dispatch(action.call.setOnCall(false));
    navigate("/lobby");
  };

  const handleMuteButton = () => {
    dispatch(action.call.ToggleIsMicMute());
  };
  const handleSpeakerButton = () => {
    dispatch(action.call.ToggleIsLoudSpeaker());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-screen w-[500px] items-center justify-between"
    >
      <div className="flex flex-col items-center my-10 ">
        <div className="text-lg font-semibold">Anonymous</div>
        <CallTimer />
      </div>
      <div>
        <ProfileBubble color="#c2acfd" />
        <audio ref={audioRef} autoPlay playsInline className="remote" />
      </div>
      <div className="flex flex-row my-10 gap-4 items-center">
        <button
          onClick={handleMuteButton}
          className={`w-10 h-10 p-2 rounded-full ${
            CallState.isMicMute ? "bg-[#868686]" : "bg-[#d4d4d4]"
          } duration-150`}
        >
          <img
            src={require("../../assets/images/icons/microphone-off.png")}
            alt="mic-off"
          />
        </button>
        <button
          onClick={handleEndCall}
          className="w-12 h-12 p-3 bg-[#ff5151] active:bg-[#ff2f2f] rounded-full duration-150"
        >
          <img
            src={require("../../assets/images/icons/phone.svg").default}
            alt="end-call"
          />
        </button>
        <button
          onClick={handleSpeakerButton}
          className={`w-10 h-10 p-2 rounded-full ${
            CallState.isLoudSpeaker ? "bg-[#868686]" : "bg-[#d4d4d4]"
          } duration-150`}
        >
          <img
            src={require("../../assets/images/icons/volume-high.png")}
            alt="loudSpeaker"
          />
        </button>
      </div>
    </motion.div>
  );
};

export default OnCallScreen;
