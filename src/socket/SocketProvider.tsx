import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ServiceConstants } from "../services/ServiceConstants";
import { socketSendMessage } from "../constant/Helper";

type ListenerMap = {
  [event: string]: Array<(payload: any) => void>;
};

type SocketContextType = {
  isConnected: boolean;
  sendEvent: (event: string, data?: any) => void;
  onEvent: (event: string, callback: (payload: any) => void) => () => void;
};

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  sendEvent: () => {},
  onEvent: () => () => {},
});

export const useSocket = () => useContext(SocketContext);

const SOCKET_URL = "wss://socket.astrotalkguruji.com";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<WebSocket | null>(null);
  const listenersRef = useRef<ListenerMap>({});
  const retryRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const forceReconnectRef = useRef<NodeJS.Timeout | null>(null); // 🔧 NEW
  const shouldReconnectRef = useRef(true); // 🔧 NEW

  const [isConnected, setIsConnected] = useState(false);

  const userDetailsData = useSelector(
    (state: RootState) => state.userDetails.userDetails
  );

  /* ---------------- CONNECT ---------------- */
  const connect = () => {
    if (!userDetailsData?.id) return;

    if (
      socketRef.current &&
      (socketRef.current.readyState === WebSocket.OPEN ||
        socketRef.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    console.log("🔌 Connecting WebSocket...");
    const ws = new WebSocket(SOCKET_URL);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("🟢 WebSocket connected");
      setIsConnected(true);
      retryCountRef.current = 0;

      ws.send(
        socketSendMessage("user_register", {
          token: `Bearer ${ServiceConstants.getBearerToken()}`,
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        listenersRef.current[message.event]?.forEach((cb) =>
          cb(message.payload)
        );
      } catch {}
    };

    ws.onerror = () => {
      ws.close();
    };

    ws.onclose = () => {
      console.log("🔴 WebSocket closed");
      setIsConnected(false);
      socketRef.current = null;

      if (!shouldReconnectRef.current || !userDetailsData?.id) return;

      // 🔧 reconnect immediately after close
      retryRef.current = setTimeout(connect, 500);
    };
  };

  /* ---------------- DISCONNECT ---------------- */
  const disconnect = () => {
    shouldReconnectRef.current = false;
    retryRef.current && clearTimeout(retryRef.current);
    retryRef.current = null;

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    setIsConnected(false);
    console.log("🔴 WebSocket disconnected");
  };

  /* ---------------- FORCE RECONNECT EVERY 30s ---------------- */
  useEffect(() => {
    if (!userDetailsData?.id) return;

    shouldReconnectRef.current = true;
    connect();

    forceReconnectRef.current = setInterval(() => {
      console.log("♻️ Force reconnect (30s)");
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close(); // 🔧 ONLY CLOSE
      }
    }, 60000);

    return () => {
      shouldReconnectRef.current = false;
      forceReconnectRef.current &&
        clearInterval(forceReconnectRef.current);
      forceReconnectRef.current = null;
      disconnect();
    };
  }, [userDetailsData?.id]);

  /* ---------------- SEND EVENT ---------------- */
  const sendEvent = (event: string, data?: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(socketSendMessage(event, data));
    }
  };

  /* ---------------- LISTEN EVENT ---------------- */
  const onEvent = (event: string, callback: (payload: any) => void) => {
    listenersRef.current[event] ||= [];
    listenersRef.current[event].push(callback);

    return () => {
      listenersRef.current[event] =
        listenersRef.current[event]?.filter((cb) => cb !== callback);
    };
  };

  return (
    <SocketContext.Provider value={{ isConnected, sendEvent, onEvent }}>
      {children}
    </SocketContext.Provider>
  );
};

