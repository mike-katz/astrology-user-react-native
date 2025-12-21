import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../../socket";
import { ServiceConstants } from "../services/ServiceConstants";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Alert } from "react-native";

type SocketContextType = {
  isConnected: boolean;
    connectSocket: () => void;
   disconnectSocket: () => void;
};

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  connectSocket: () => {},
  disconnectSocket: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider1 = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
 const userDetailsData = useSelector((state: RootState) => state.userDetails.userDetails);
    const connectSocket = () => {
    if (!socket.connected) {
      console.log("🔌 Connecting socket...");
      socket.connect();
    }
  };

  const disconnectSocket = () => {
    if (socket.connected) {
      console.log("🔌 Disconnecting socket...");
      socket.disconnect();
    }
  };

  useEffect(() => {
    const onConnect = () => {
        console.log("🔥 Socket connected:", socket.id);
        setIsConnected(true);
        // user register
        socket.emit('user_register', {
            token: `Bearer ${ServiceConstants.getBearerToken()}`
        });
    };

    const onDisconnect = () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    if(userDetailsData?.id!=undefined && userDetailsData?.id!=null){
        console.log("Socket User Id ==="+userDetailsData?.id);
        // ✅ CONNECT AFTER listeners
        socket.connect();
    }
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    //   socket.disconnect(); // logout / app close
    };
  }, [userDetailsData?.id]);

  return (
    <SocketContext.Provider value={{ isConnected , 
        connectSocket,
        disconnectSocket,}}>
      {children}
    </SocketContext.Provider>
  );
};
