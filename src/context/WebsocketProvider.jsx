import React, { useState, useContext, createContext } from "react";

const WebSocketContext = createContext();

const WebsocketProvider = ({ children }) => {
  const [webSockets, setwebSockets] = useState({});

  const createNewSocket = (socketName, url) => {
    const newSocket = new WebSocket(url);
    setwebSockets({ ...webSockets, [socketName]: newSocket });
    return newSocket;
  };

  const sendToSocket = (socket, data) => {
    socket.send(JSON.stringify(data));
  };

  return (
    <WebSocketContext.Provider
      value={{ createNewSocket, webSockets, sendToSocket }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebsocketProvider;
export const useWebSocket = () => useContext(WebSocketContext);
