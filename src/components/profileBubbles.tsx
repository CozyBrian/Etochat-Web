import React from "react";
import { motion } from "framer-motion";
import Memoji from "../assets/images/memojis";

const ProfileBubble = ({ size = 102, color = "#0080f9", id = "" }) => {
  const picture = Memoji.find((memoji) => memoji.id === id);
  const n = 50;
  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ repeat: Infinity, delay: 0, ease: "easeInOut" }}
        style={{
          width: size + n * 3,
          height: size + n * 3,
          backgroundColor: `${picture?.color || color}6d`,
        }}
        className={`absolute rounded-full`}
      />
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ repeat: Infinity, delay: 0.15, ease: "easeInOut" }}
        style={{
          width: size + n * 2,
          height: size + n * 2,
          backgroundColor: `${picture?.color || color}a4`,
        }}
        className={`absolute rounded-full`}
      />
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
        style={{
          width: size + n,
          height: size + n,
          backgroundColor: `${picture?.color || color}d1`,
        }}
        className={`absolute rounded-full`}
      />
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ repeat: Infinity, delay: 0.45, ease: "easeInOut" }}
        style={{
          width: size,
          height: size,
          backgroundColor: `${picture?.color || color}`,
        }}
        className={`absolute rounded-full`}
      />
      <div className="absolute rounded-full">
        {id !== "" && (
          <img
            src={picture?.src}
            style={{ width: size, height: size }}
            className="rounded-full"
            alt="profile"
          />
        )}
      </div>
    </div>
  );
};

export default ProfileBubble;
