export type UserType = {
  username: string;
  profileID: string;
  mode: "SHARER" | "LISTENER";
};

export type initialStateType = {
  incomingUser?: UserType;
  onCall: boolean;
  isMicMute: boolean;
  isLoudSpeaker: boolean;
};
