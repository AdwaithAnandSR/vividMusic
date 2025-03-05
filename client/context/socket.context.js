import { createContext, useContext, useEffect } from "react";
import io from "socket.io-client";
import Constants from "expo-constants";

const SocketContext = createContext();
// const api = Constants.expoConfig.extra.clientApi;
const api = "http://192.168.20.104:4000"

export const SocketProvider = ({ children }) => {
  const socket = io(api);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
