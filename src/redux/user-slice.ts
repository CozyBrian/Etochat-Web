import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../@types";
import Memoji from "../assets/images/memojis";

const initialState: UserType = {
  pid: "",
  sid: "",
  username: "",
  profileID: Memoji[0].id,
  mode: "SHARER",
};

const userState = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      if (action.payload === "") {
        state.username = "Anon#369";
      } else {
        state.username = action.payload;
      }
    },
    setProfile: (state, action: PayloadAction<string>) => {
      state.profileID = action.payload;
    },
    setMode: (state, action: PayloadAction<"SHARER" | "LISTENER">) => {
      state.mode = action.payload;
    },
    setSocketID: (state, action: PayloadAction<string>) => {
      state.sid = action.payload;
    },
    setPeerID: (state, action: PayloadAction<string>) => {
      state.pid = action.payload;
    },
  },
});

export default userState;
