import Ionicons from "react-native-vector-icons/Ionicons";
const getMessageStatus = (msg:any) => {
  if (msg) return "read";
  if (msg) return "delivered";
  return "sent";
};
export const MessageStatus = ({ message }:any) => {
  const status = getMessageStatus(message);

  if (status === "sent") {
    return <Ionicons name="checkmark" size={16} color="#999" />;
  }

  if (status === "delivered") {
    return <Ionicons name="checkmark-done" size={16} color="#999" />;
  }

  if (status === "read") {
    return <Ionicons name="checkmark-done" size={16} color="#34B7F1" />;
  }

  return null;
};
