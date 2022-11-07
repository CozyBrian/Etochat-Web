import React from "react";

const ProfileBubble = ({ size = 102, color = "#0080f9" }) => {
  const n = 50;
  return (
    <div className="flex items-center justify-center">
      <div
        style={{
          width: size + n * 3,
          height: size + n * 3,
          backgroundColor: `${color}6d`,
        }}
        className={`absolute rounded-full`}
      />
      <div
        style={{
          width: size + n * 2,
          height: size + n * 2,
          backgroundColor: `${color}a4`,
        }}
        className={`absolute rounded-full`}
      />
      <div
        style={{
          width: size + n,
          height: size + n,
          backgroundColor: `${color}d1`,
        }}
        className={`absolute rounded-full`}
      />
      <div
        style={{ width: size, height: size, backgroundColor: `${color}` }}
        className={`absolute rounded-full`}
      />
    </div>
  );
};

export default ProfileBubble;
