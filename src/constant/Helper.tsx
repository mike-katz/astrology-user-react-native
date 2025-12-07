import { View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { colors } from "../styles";

 export const StarRating = ({size, rating }:any) => {
    return (
      <View style={{ flexDirection: "row" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Feather
            key={star}
            name="star"
            size={size}
            color={star <= rating ? colors.primaryColor : "#CCCCCC"} 
            style={{ marginRight: 3 }}
          />
        ))}
      </View>
    );
  };