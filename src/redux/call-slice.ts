import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateType, UserType } from "../@types";

const initialState: initialStateType = {
  isConnected: false,
  incomingUser: undefined,
  onCall: false,
  isMicMute: false,
  remoteMicMute: false,
  isLoudSpeaker: false,
};

const callState = createSlice({
  name: "call",
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setIncomingUser: (state, action: PayloadAction<UserType>) => {
      state.incomingUser = action.payload;
    },
    setOnCall: (state, action: PayloadAction<boolean>) => {
      state.onCall = action.payload;
      if (action.payload === false) {
        state.isMicMute = false;
        state.isLoudSpeaker = false;
        state.remoteMicMute = false;
      }
    },
    ToggleIsMicMute: (state) => {
      state.isMicMute = !state.isMicMute;
    },
    setRemoteMicMute: (state, action: PayloadAction<boolean>) => {
      state.remoteMicMute = action.payload;
    },
    ToggleIsLoudSpeaker: (state) => {
      state.isLoudSpeaker = !state.isLoudSpeaker;
    },
  },
});

export default callState;
