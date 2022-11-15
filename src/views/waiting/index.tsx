import { motion } from "framer-motion";
import ProfileBubble from "../../components/profileBubbles";
import { useAppSelector } from "../../hooks";

const WaitingScreen = () => {
  const User = useAppSelector((state) => state.user);

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
