import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { action } from "../../../redux";

const ModeSelector = () => {
  const mode = useAppSelector((state) => state.user.mode);
  const [selected, setSelected] = useState(mode);
  const dispatch = useAppDispatch();

  const options: {
    id: "SHARER" | "LISTENER";
    title: string;
  }[] = [
    { id: "SHARER", title: "Sharer" },
    { id: "LISTENER", title: "Listener" },
  ];

  const handlePress = (id: "SHARER" | "LISTENER") => {
    setSelected(id);
    dispatch(action.user.setMode(id));
  };

  return (
    <div className="flex flex-col">
      <label>Join as</label>
      {options.map((item, i) => (
        <div
          onClick={() => handlePress(item.id)}
          key={i}
          className="flex flex-row items-center gap-1 select-none cursor-pointer"
        >
          <ModeRadio isSelected={selected === item.id} />
          {item.title}
        </div>
      ))}
    </div>
  );
};

const ModeRadio = ({ isSelected = false }) => {
  return (
    <div>
      <div
        className={`flex p-[1px] w-3.5 h-3.5 ${
          isSelected
            ? "bg-gradient-to-r from-[#5c40ff] to-[#a221ff]"
            : "bg-black"
        } rounded-full duration-150`}
      >
        <div className="w-full h-full bg-white rounded-full p-[1px]">
          <div
            className={`w-full h-full ${
              isSelected && "bg-gradient-to-r from-[#5c40ff] to-[#a221ff]"
            } rounded-full duration-150`}
          />
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;
