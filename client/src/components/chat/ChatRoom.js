import { useState, useCallback, useEffect, useContext, useRef } from "react";
import { useCookies } from "react-cookie";
import { SocketContext, makeMessage } from "../../service/socket";
import MessageForm from "./MessageForm";

function ChatRoom() {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [messages, setMessages] = useState([]);
  const chatWindow = useRef(null);
  const socket = useContext(SocketContext);

  // 새 메시지를 받으면 스크롤을 이동하는 함수
  const moveScrollToReceiveMessage = useCallback(() => {
    if (chatWindow.current) {
      chatWindow.current.scrollTo({
        top: chatWindow.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  // RECEIVE_MESSAGE 이벤트 콜백: messages state에 데이터를 추가합니다.
  const handleReceiveMessage = useCallback(
    (pongData) => {
      const newMessage = makeMessage(pongData); // makeMessage는 아직 구현하지 않은 함수.
      setMessages((messages) => [...messages, newMessage]);
      moveScrollToReceiveMessage();
    },
    [moveScrollToReceiveMessage]
  );

  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", handleReceiveMessage); // 이벤트 리스너 설치

    return () => {
      socket.off("RECEIVE_MESSAGE", handleReceiveMessage); // 이벤트 리스너 해제
    };
  }, [socket, handleReceiveMessage]);

  return (
    <div className="d-flex flex-column" style={{ width: "90%" }}>
      <div className="text-box">
        <span>{cookies.userData.name}</span> 님 환영합니다!
      </div>
      <div className="chat-window card" ref={chatWindow}>
        {messages.map((message, index) => {
          const { nickname, content, time } = message;
          // messages 배열을 map함수로 돌려 각 원소마다 item을 렌더링 해줍니다.
          return (
            <div key={index} className="d-flex flex-row">
              {nickname && <div className="message-nickname">{nickname}: </div>}
              <div>{content}</div>
              <div className="time">{time}</div>
            </div>
          );
        })}
      </div>
      <MessageForm nickname={cookies.userData.name}></MessageForm>
    </div>
  );
}

export default ChatRoom;
