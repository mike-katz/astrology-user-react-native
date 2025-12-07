import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { colors, Fonts } from "../styles";

const FeedbackDialog = ({ visible, onClose, onSubmit }:any) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!selected) return;
    onSubmit({ rating: selected, feedback });
    onClose();
    setSelected(null);
    setFeedback("");
  };

  const options = ["Great", "Average", "Needs improvement"];

  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* Dimmed background */}
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {/* Title */}
          <Text style={styles.title}>
            How was your overall experience of Daily horoscope?
          </Text>

          {/* Radio Buttons */}
          {options.map((item) => (
            <Pressable
              key={item}
              style={styles.radioRow}
              onPress={() => setSelected(item)}
            >
              <View style={styles.radioOuter}>
                {selected === item && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>{item}</Text>
            </Pressable>
          ))}

          {/* Show feedback only if selected */}
          {selected && (
            <>
              <View style={styles.separator} />

              <Text style={styles.feedbackLabel}>Share your feedback</Text>

              <TextInput
                placeholder="Type here"
                placeholderTextColor="#999"
                style={styles.feedbackBox}
                value={feedback}
                onChangeText={setFeedback}
                multiline
              />
            </>
          )}

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default FeedbackDialog;


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  dialog: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    paddingTop: 30,
    position: "relative",
  },

  /* Close Button */
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 10,
    padding: 5,
  },
  closeIcon: {
    fontSize: 22,
    color: "#333",
  },

  /* Title */
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 20,
    fontFamily:Fonts.SemiBold,
    marginRight:30,
  },

  /* Radio Buttons */
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
  radioText: {
    fontSize: 16,
    color: "#000",
    fontFamily:Fonts.Regular
  },

  /* Separator Line */
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },

  /* Feedback Section */
  feedbackLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#000",
    fontFamily:Fonts.SemiBold
  },
  feedbackBox: {
    height: 110,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    textAlignVertical: "top",
    color: "#000",
  },

  /* Submit Button */
  submitBtn: {
    marginTop: 20,
    backgroundColor: colors.primaryColor, // Yellow color from screenshot
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  submitText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    fontFamily:Fonts.SemiBold
  },
});
