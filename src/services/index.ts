const initCall = (num: number, timeout: number) =>
  new Promise(function (resolve, reject) {
    // do a thing, possibly async, then…
    setTimeout(() => {
      if (num === 0) {
        resolve("Stuff worked!");
      } else {
        reject(Error("It broke"));
      }
    }, timeout);
  });

export default initCall;

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.1.google.com:19302", "stun:stun2.1.google.com:19302"],
    },
  ],
};

const pc = new RTCPeerConnection(servers);

export const setupSources = async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });

  const remoteStream = new MediaStream();

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  return { localStream, remoteStream };
};
