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
import Feather from "react-native-vector-icons/Feather";

const { height } = Dimensions.get("window");

const COLLAPSED = 80;
const EXPANDED = 260;
type Props = {
  data: any[];
  onCancel: (item: any) => void;
};

export default function YellowWaitlistSheet({
  data,
  onCancel,
}: Props) {
  const translateY = useRef(new Animated.Value(EXPANDED - COLLAPSED)).current;
  const isOpen = useRef(false);
  const [isOpenArrow, setIsOpenArrow] = React.useState(false);

  useEffect(() => {
    open(); 
    }, []);

  const toggleSheet = () => {
    Animated.spring(translateY, {
      toValue: isOpen.current ? EXPANDED - COLLAPSED : 0,
      useNativeDriver: true,
    }).start();
    isOpen.current = !isOpen.current;
    isOpenArrow ? close() : open();
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
      toValue: EXPANDED - COLLAPSED,
      useNativeDriver: true,
    }).start();
    isOpen.current = false;
     setIsOpenArrow(false);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.avatar} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subText}>
          {item.price} · (Chat)
        </Text>
        <Text style={styles.subText}>
         {item.waitTime}
        </Text>
      </View>

      <TouchableOpacity style={{alignItems:'center'}} onPress={() => onCancel(item)}>
        <Feather name="x-circle" size={22} color="#999" />
            <Text style={styles.subText}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );

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
    bottom: 20,
    height: EXPANDED,
    width: "100%",
    backgroundColor: "#FFF6C7",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 12,
    zIndex: 999,   
  },

  arrow: {
    alignSelf:'center',
    alignItems: "center",
    paddingVertical: 6,
    marginTop:-20,
    backgroundColor:"#FFF6C7",
    borderRadius:25,
    width:50,
    height:40
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor:'gray',
    borderBottomWidth:.4
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
  },

  subText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});
