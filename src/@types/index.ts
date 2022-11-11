import Peer from "peerjs";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export type pageProps = {
  socket?: Socket<DefaultEventsMap, DefaultEventsMap>;
  peer?: Peer;
  audioRef?: React.RefObject<HTMLAudioElement>;
};

export type UserType = {
  username: string;
  profileID: string;
  mode: "SHARER" | "LISTENER";
};

export type PSUserType = {
  user: {
    id: string;
    username: string;
    profileID: string;
    mode: "SHARER" | "LISTENER";
  };
};

export type initialStateType = {
  isConnected: boolean;
  incomingUser?: UserType;
  onCall: boolean;
  isMicMute: boolean;
  isLoudSpeaker: boolean;
};
