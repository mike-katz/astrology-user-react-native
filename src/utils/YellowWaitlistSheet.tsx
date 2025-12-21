import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  PanResponder,
  Alert,
} from "react-native";
import FastImage from "react-native-fast-image";
import Feather from "react-native-vector-icons/Feather";
import { Fonts } from "../styles";

const { height } = Dimensions.get("window");


const MAX_HEIGHT = 260;
const COLLAPSED_HEIGHT = 60; // arrow + thodu content
const TRANSLATE_Y = MAX_HEIGHT - COLLAPSED_HEIGHT+50;
type Props = {
  data: any[];
  onCancel: (item: any) => void;
};

export default function YellowWaitlistSheet({
  data,
  onCancel,
}: Props) {
  const translateY = useRef(new Animated.Value(TRANSLATE_Y)).current;
  const isOpen = useRef(false);
  const [isOpenArrow, setIsOpenArrow] = React.useState(false);

  useEffect(() => {
    open();
  }, []);

  const toggleSheet = () => {
  if (isOpen.current) {
    close();
  } else {
    open();
  }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 10,
      onPanResponderRelease: (_, g) => {
        if (g.dy > 40) {
          close();
        } else if (g.dy < -40) {
          open();
        }
      },
    })
  ).current;

  const open = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    isOpen.current = true;
    setIsOpenArrow(true);
  };

  const close = () => {
    Animated.spring(translateY, {
      toValue: TRANSLATE_Y,
      useNativeDriver: true,
    }).start();
    isOpen.current = false;
    setIsOpenArrow(false);
  };

  const renderItem = ({ item }: any) => {
    const actionText = !item.is_accept
  ? "Cancel"
  : item.status === "pending"
    ? "Accept"
    : "Chat";
    return(
    <View style={styles.row}>
      <FastImage source={{ uri: item.profile }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subText}>
          ₹{item.rate}/min. (Chat)
        </Text>
        <Text style={styles.subText}>
          {item.duration} mins.
        </Text>
      </View>

      <TouchableOpacity style={{ alignItems: 'center',borderColor:'gray',borderRadius:10,borderWidth:1,paddingHorizontal:10,paddingVertical:5 }} onPress={() => onCancel(item)}>
        {/* {item.is_accept?null:<Feather name="x-circle" size={22} color="#999" />} */}
        <Text style={styles.subText}>
          {actionText}
        </Text>
      </TouchableOpacity>
    </View>
  )};

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY }] }]}
      {...panResponder.panHandlers}
    >
      {/* 🔼 Arrow */}
      <TouchableOpacity onPress={toggleSheet} style={styles.arrow}>
        <Feather
          name={isOpenArrow ? "chevron-down" : "chevron-up"}
          size={22}
        />
      </TouchableOpacity>

      {/* 🟡 FlatList */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(item.id ?? index)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    height: MAX_HEIGHT,
    width: "100%",
    backgroundColor: "#FFF6C7",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 12,
    zIndex: 999,
  },

  arrow: {
    alignSelf: 'center',
    alignItems: "center",
    paddingVertical: 6,
    marginTop: -20,
    backgroundColor: "#FFF6C7",
    borderRadius: 25,
    width: 50,
    height: 40
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: .4
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: "#F3E58C",
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily:Fonts.Medium
  },

  subText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    fontFamily:Fonts.Medium
  },
});
