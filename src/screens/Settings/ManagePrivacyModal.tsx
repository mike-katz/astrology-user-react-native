import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, Fonts } from "../../styles";

const { width } = Dimensions.get("window");

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit?: (state: Record<string, boolean>) => void;
  initial?: Partial<Record<string, boolean>>;
};

export default function ManagePrivacyModal({ visible, onClose, onSubmit, initial }: Props) {
  const [state, setState] = useState({
    restrictAfterChat: true,
    restrictDownload: true,
    restrictScreenshot: true,
    restrictCallRecording: true,
    ...initial,
  });

  useEffect(() => {
    // reset when opened (optional)
    if (visible && initial) {
      setState((s) => ({ ...s, ...initial }));
    }
  }, [visible, initial]);

  const toggle = (key: keyof typeof state) => {
    setState((s) => ({ ...s, [key]: !s[key] }));
  };

  const handleSubmit = () => {
    onSubmit?.(state);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <SafeAreaView style={styles.sheetWrap}>
        <View style={styles.sheet}>
          {/* handle */}
          <View style={styles.handle} />

          {/* Title row */}
          <View style={styles.titleRow}>
            <View style={styles.titleIcon}>
              <Feather name="lock" size={20} color="#F3A200" />
            </View>
            <Text style={styles.titleText}>Manage Your Privacy!</Text>
          </View>

          {/* Options list */}
          <View style={styles.options}>
            <Row
              iconSource={<Feather name="message-circle" size={22} color="#4E9AEE" />}
              title="Restrict astrologers from accessing your chat after the chat ends"
              value={state.restrictAfterChat}
              onToggle={() => toggle("restrictAfterChat")}
            />

            <Row
              iconSource={<Feather name="download" size={22} color="#2BC06A" />}
              title="Restrict astrologers from downloading the images you shared"
              value={state.restrictDownload}
              onToggle={() => toggle("restrictDownload")}
            />

            <Row
              iconSource={<Feather name="camera" size={22} color="#6B83F2" />}
              title="Restrict astrologers from taking screenshots of your chat"
              value={state.restrictScreenshot}
              onToggle={() => toggle("restrictScreenshot")}
            />

            <Row
              iconSource={<Feather name="phone" size={22} color="#FF9E6B" />}
              title="Restrict astrologers from accessing your call recording"
              value={state.restrictCallRecording}
              onToggle={() => toggle("restrictCallRecording")}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.skipBtn} onPress={onClose}>
              <Text style={styles.skipText}>SKIP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

/* Helper Row component */
function Row({
  iconSource,
  title,
  value,
  onToggle,
}: {
  iconSource: React.ReactNode;
  title: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.iconBox}>{iconSource}</View>
        <Text numberOfLines={2} style={styles.rowText}>
          {title}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#ddd", true: colors.primaryColor }}
        thumbColor={"#fff"}
        ios_backgroundColor="#ddd"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheetWrap: {
    position: "absolute",
    bottom: 0,
    width: width,
    alignItems: "center",
  },
  sheet: {
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 18,
    // marginBottom: 12,
    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 12,
  },
  handle: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#EDEDED",
    alignSelf: "center",
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  titleIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FFF6E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#F6E1B5",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    fontFamily: (Fonts && Fonts.Medium) || "System",
  },

  options: {
    marginTop: 6,
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#F0F0F0",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#F1F1F1",
  },
  rowText: {
    flex: 1,
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
    fontFamily: (Fonts && Fonts.Regular) || "System",
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  skipBtn: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    paddingVertical: 14,
    borderRadius: 10,
    marginRight: 12,
    alignItems: "center",
  },
  skipText: {
    color: "#666",
    fontWeight: "700",
  },
  submitBtn: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    paddingVertical: 14,
    borderRadius: 10,
    marginLeft: 0,
    alignItems: "center",
  },
  submitText: {
    color: "#111",
    fontWeight: "800",
  },
});
