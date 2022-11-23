import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import ProfileBubble from "../../components/profileBubbles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { action } from "../../redux";
import CallTimer from "./components/callTimer";

type pageProps = {
  onEnd: () => void;
  micMute: () => void;
};

const OnCallScreen = ({ onEnd, micMute }: pageProps) => {
  const CallState = useAppSelector((state) => state.call);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleEndCall = () => {
    dispatch(action.call.setOnCall(false));
    onEnd();
    navigate("/lobby");
  };

  const handleMuteButton = () => {
    dispatch(action.call.ToggleIsMicMute());
    micMute();
  };

  const handleSpeakerButton = () => {
    dispatch(action.call.ToggleIsLoudSpeaker());
  };

  useEffect(() => {
    dispatch(action.call.setOnCall(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-screen w-[500px] items-center justify-between"
    >
      <div className="flex flex-col items-center my-10 ">
        <div className="flex flex-row items-center text-lg font-semibold pl-4">
          <div className="duration-200">Anonymous</div>
          <div className="w-4">
            <AnimatePresence>
              {CallState.remoteMicMute && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-4 ml-1"
                  src={
                    require("../../assets/images/icons/red-mic-mute.svg")
                      .default
                  }
                  alt="rem-mic-mute"
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        <CallTimer />
      </div>
      <div>
        <ProfileBubble color="#c2acfd" />
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
