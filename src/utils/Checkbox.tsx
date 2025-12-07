import React from "react";
import { Pressable } from "react-native";
import Feather from "react-native-vector-icons/Feather";

type Props = {
  value: boolean;                // controlled value
  onValueChange: (val: boolean) => void; // callback to parent
  size?: number;
  color?: string;
};

const Checkbox = ({ value, onValueChange, size = 24, color = "black" }: Props) => {
  return (
    <Pressable onPress={() => onValueChange(!value)}>
        <Feather
        name={value ? "check-square" : "square"}   // Feather available names
        size={size}
        color={value ? color : "#999"}
      />
    </Pressable>
  );
};

export default Checkbox;
