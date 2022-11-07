import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateType, UserType } from "../@types";

const initialState: initialStateType = {
  incomingUser: undefined,
  onCall: false,
  isMicMute: false,
  isLoudSpeaker: false,
};

const callState = createSlice({
  name: "call",
  initialState,
  reducers: {
    setIncomingUser: (state, action: PayloadAction<UserType>) => {
      state.incomingUser = action.payload;
    },
    setOnCall: (state, action: PayloadAction<boolean>) => {
      state.onCall = action.payload;
      if (action.payload === false) {
        state.isMicMute = false;
        state.isLoudSpeaker = false;
      }
    },
    ToggleIsMicMute: (state) => {
      state.isMicMute = !state.isMicMute;
    },
    ToggleIsLoudSpeaker: (state) => {
      state.isLoudSpeaker = !state.isLoudSpeaker;
    },
  },
});

export default callState;
