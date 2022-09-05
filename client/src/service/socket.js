import { createContext } from "react";
import socketIo from "socket.io-client";
import port from "../data/port.json";
import dayjs from "dayjs";

export const socket = socketIo(String(port.url), {
  // withCredentials: true,
});
export const SocketContext = createContext(socket);

socket.on("connect", () => {
  console.log("socket server connected.");
});

socket.on("disconnect", () => {
  console.log("socket server disconnected.");
});

export const makeMessage = (pongData) => {
  const { nickname, content, type, time } = pongData;

  let nicknameLabel;
  let contentLabel = "";

  switch (type) {
    case "JOIN_ROOM": {
      contentLabel = `${nickname} has joined the room.`;
      break;
    }
    case "SEND_MESSAGE": {
      contentLabel = String(content);
      nicknameLabel = nickname;
      break;
    }
    default:
  }

  return {
    nickname: nicknameLabel,
    content: contentLabel,
    time: dayjs(time).format("HH:mm"),
  };
};
