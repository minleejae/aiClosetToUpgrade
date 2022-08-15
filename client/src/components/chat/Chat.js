import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { socket, SocketContext } from "../../service/socket";
import ChatRoom from "./ChatRoom";

const Chat = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  console.log();
  useEffect(() => {
    socket.emit("JOIN_ROOM", { nickname: cookies.userData.name });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      <div>
        <div
          className="album"
          style={{
            paddingTop: 100 + "px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ChatRoom />
        </div>
      </div>
    </SocketContext.Provider>
  );
};

export default Chat;
