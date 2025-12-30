import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../styles";

const LEFT_OPTIONS: Array<keyof typeof RIGHT_OPTIONS> = [
  "Sort by",
  "Skill",
  "Language",
  "Gender",
  "Country",
  "Offer",
  "Top Astrologers",
];

const SORT_OPTIONS = [
  "Popularity",
  "Experience: High to Low",
  "Experience: Low to High",
  "Orders: High to Low",
  "Orders: Low to High",
  "Price: High to Low",
  "Price: Low to High",
  "Rating: High to Low",
];

const RIGHT_OPTIONS = {
  "Sort by": [
    "Popularity",
    "Experience: High to Low",
    "Experience: Low to High",
    "Orders: High to Low",
    "Orders: Low to High",
    "Price: High to Low",
    "Price: Low to High",
    "Rating: High to Low",
  ],
  Skill: ["Vedic", "Tarot", "Numerology", "Palmistry"],
  Language: ["English", "Hindi", "Gujarati", "Tamil", "Marathi"],
  Gender: ["Male", "Female"],
  Country: ["India", "USA", "Canada", "UK"],
  Offer: ["Discount Available", "Free First Chat", "Promo"],
  "Top Astrologers": ["Top Rated", "Most Experienced", "Most Popular"],
};

const SortFilterModal = ({ visible, onClose,onApply }: any) => {
  const insets = useSafeAreaInsets();
  const [activeLeft, setActiveLeft] = useState<keyof typeof RIGHT_OPTIONS>("Sort by");
  // const [selectedSort, setSelectedSort] = useState<string>("Popularity");
  const [selectedValues, setSelectedValues] = useState({
  "Sort by": ["Popularity"],
  Skill: [],
  Language: [],
  Gender: [],
  Country: [],
  Offer: [],
  "Top Astrologers": [],
});

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop} />

      <View style={[styles.modal, { marginBottom: -10}]}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Feather name="filter" size={20} color="#000" />
            <Text style={styles.headerTitle}> Sort & Filter </Text>
          </View>

          <Pressable onPress={onClose}>
            <Feather name="x" size={26} color="#000" />
          </Pressable>
        </View>

        <View style={styles.divider} />

        <View style={styles.mainRow}>
          {/* LEFT SIDE FIXED MENU */}
          <View style={styles.leftMenu}>
            {LEFT_OPTIONS.map((item) => {
              const active = item === activeLeft;

              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => setActiveLeft(item)}
                  style={[styles.leftItem, active && styles.leftItemActive]}
                >
                  <Text
                    style={[styles.leftText, active && styles.leftTextActive]}
                  >
                    {item}
                  </Text>

                    {/* Yellow vertical bar */}
                    <View
                    style={{
                        width: 6,
                        height: 55,
                        backgroundColor: active ? colors.primaryColor : "transparent",
                        marginRight: 12,
                        // borderRadius: 2,
                        borderTopRightRadius:22,
                        borderBottomRightRadius:22,
                        position:'absolute'
                    }}
                    />

                  {active && item==='Language' && <View style={styles.leftDot} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* RIGHT SIDE OPTIONS */}
          <View style={styles.rightContainer}>
            {(RIGHT_OPTIONS[activeLeft] || []).map((item) => {
              // const selected = selectedSort === item;
            const selected = selectedValues[activeLeft].includes(item);
              return (
                <TouchableOpacity
                  key={item}
                  style={styles.radioRow}
                  // onPress={() => {setSelectedSort(item);
                  // }}
                  onPress={() => {
                      
                    setSelectedValues(prev => {
                            // Single selection for "Sort by" and "Gender"
                            if (activeLeft === "Sort by" || activeLeft === "Gender") {
                              return {
                                ...prev,
                                [activeLeft]: [item], // replace previous selection
                              };
                            } else {
                              // Multi-selection for other categories
                              const alreadySelected = prev[activeLeft].includes(item);
                              return {
                                ...prev,
                                [activeLeft]: alreadySelected
                                  ? prev[activeLeft].filter(v => v !== item)  // remove
                                  : [...prev[activeLeft], item],             // add
                              };
                            }
                          });
                    
                    }}
                >
                  <View style={styles.radioOuter}>
                    {selected && <View style={styles.radioInner} />}
                  </View>

                  <Text style={styles.radioText}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* APPLY BUTTON */}
        <View style={styles.applyWrap}>
          <TouchableOpacity style={styles.applyBtn}   onPress={() => {
                  onApply(selectedValues); 
                  onClose();                        
                }}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SortFilterModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modal: {
    backgroundColor: "#FFF",
    height: "78%",  
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%", 
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "#E8E8E8",
  },

  mainRow: {
    flexDirection: "row",
    flex: 1,
  },

  /* LEFT MENU */
  leftMenu: {
    width: "33%",
    borderRightWidth: 1,
    borderRightColor: "#EEE",
    paddingTop: 15,
  },

  leftItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    position: "relative",
  },

  leftItemActive: {
    backgroundColor: "#FFF",
  },

  leftText: {
    fontSize: 16,
    color: "#777",
  },

  leftTextActive: {
    color: "#000",
    fontWeight: "600",
  },

  leftDot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: "#000",
    position: "absolute",
    right: 12,
    top: "50%",
    marginTop: -4,
  },

  /* RIGHT LIST */
  rightContainer: {
    flex: 1,
    padding: 20,
  },

  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#000",
  },

  radioText: {
    fontSize: 16,
    marginLeft: 12,
  },

  applyWrap: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },

  applyBtn: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  applyText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
