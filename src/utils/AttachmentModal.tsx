import React from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { colors, Fonts } from "../styles";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (type: "camera" | "gallery" | "audio" | "video" | "document") => void;
};

const AttachmentModal = ({ visible, onClose, onSelect }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <View style={styles.modal}>
          <Text style={styles.title}>Share</Text>

          <View style={styles.row}>
            <AttachmentItem
              icon="camera"
              label="Camera"
              onPress={() => onSelect("camera")}
            />
            <AttachmentItem
              icon="image"
              label="Gallery"
              onPress={() => onSelect("gallery")}
            />
            <AttachmentItem
              icon="mic"
              label="Audio"
              onPress={() => onSelect("audio")}
            />
          </View>

          <View style={styles.row}>
            <AttachmentItem
              icon="video"
              label="Video"
              onPress={() => onSelect("video")}
            />
            <AttachmentItem
              icon="file-text"
              label="Document"
              onPress={() => onSelect("document")}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const AttachmentItem = ({ icon, label, onPress }: any) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.iconWrap}>
      <Feather name={icon} size={22} color="#fff" />
    </View>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

export default AttachmentModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    fontFamily: Fonts.Medium,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    
    marginBottom: 20,
  },
  item: {
    alignItems: "center",
    width:"33%",
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: Fonts.Medium,
  },
});
