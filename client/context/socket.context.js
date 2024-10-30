import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Constants from 'expo-constants';

const SocketContext = createContext();
const api = Constants.expoConfig.extra.api.admin
export const SocketProvider = ({ children }) => {
   const [socket, setSocket] = useState(null);

   useEffect(() => {
      const newSocket = io(api);
      setSocket(newSocket);
      return () => newSocket.close();
   }, []);

   return (
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
   );
};

export const useSocket = () => {
   return React.useContext(SocketContext);
};