import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable
} from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function TimePickerDialog({ visible, onClose, onApply }:any) {
const [birthDate, setBirthDate] = useState<Date|null>(new Date());
  return (
    <Modal transparent visible={visible} animationType="fade">
        <View style={styles.backdrop}>
            <View style={styles.modalBox}>
                <Text style={styles.title}>Time Picker</Text>

                {/* Most Helpful */}
                 <View style={{justifyContent:'center',alignItems:'center'}}>
                      <DatePicker 
                          mode="time"
                          date={birthDate || new Date()} 
                          onDateChange={setBirthDate}
                          maximumDate={new Date()}
                          locale="en" 
                          theme="light"
                          />
                  </View>

                {/* Buttons */}
                <View style={styles.btnRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                    <Text style={styles.cancelTxt}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.applyBtn}
                    onPress={() => {
                    onApply(birthDate);
                    onClose();
                    }}
                >
                    <Text style={styles.applyTxt}>Apply</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalBox: {
    backgroundColor: "#fff",
    width: "82%",
    alignSelf: "center",
    borderRadius: 18,
    padding: 20,
    // marginTop: "50%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 18
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 2
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FFC700",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 50,
    backgroundColor: "#FFC700"
  },
  optionText: {
    fontSize: 16,
    color: "#111"
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24
  },
  cancelBtn: {
    width: "45%",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#F1F1F1",
    alignItems: "center"
  },
  applyBtn: {
    width: "45%",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#FFC700",
    alignItems: "center"
  },
  cancelTxt: {
    color: "#777",
    fontSize: 16,
    fontWeight: "600"
  },
  applyTxt: {
    color: "#111",
    fontSize: 16,
    fontWeight: "700"
  }
});
