import React from "react";

type profileCardProps = {
  isSelected?: boolean;
  item: any;
  onPress?: () => void;
};

const ProfileCard = ({ isSelected, item, onPress }: profileCardProps) => {
  return (
    <div
      onClick={onPress}
      className="relative flex justify-center items-center cursor-pointer"
    >
      <div
        className={`flex w-32 h-32 justify-center items-center ${
          isSelected && "p-0.5 bg-gradient-to-r from-[#5c40ff] to-[#a221ff]"
        } rounded-xl duration-150`}
      >
        <img
          src={item.src}
          alt="profile"
          className="w-full h-full rounded-xl object-fit"
        />
      </div>
    </div>
  );
};

export default ProfileCard;
