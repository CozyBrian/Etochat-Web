import React, { useState } from "react";
import Memoji from "../../../assets/images/memojis";
import { useAppDispatch } from "../../../hooks";
import { action } from "../../../redux";
import ProfileCard from "./profileCard";

const ProfileSelector = () => {
  const [selected, setSelected] = useState(Memoji[0].id);
  const dispatch = useAppDispatch();

  const handleOnPress = (id: string) => {
    setSelected(id);
    dispatch(action.user.setProfile(id));
  };

  return (
    <div>
      <label>Select an anonymous profile picture</label>
      <div className="flex justify-center items-center h-[400px] my-4">
        <div className="grid grid-cols-3 grid-rows-3 gap-2 w-[400px]">
          {Memoji.map((item, i) => (
            <ProfileCard
              isSelected={item.id === selected}
              item={item}
              key={item.id}
              onPress={() => handleOnPress(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSelector;
