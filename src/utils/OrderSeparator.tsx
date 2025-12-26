import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Fonts } from '../styles';
import moment from 'moment';

type Props = {
  orderId: string;
  dateAt:string;
  onPress?: () => void;
  onInfoPress?: () => void;
};

export const OrderSeparator = ({ orderId,dateAt, onPress, onInfoPress }: Props) => {
    const dateFormat = moment(dateAt).format("DD MMM YYYY");
    return(
    <View>
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={styles.orderSeparator}
  >
    <Text style={styles.orderSeparatorText}>
      Chat: #{orderId}
    </Text>

    <TouchableOpacity
      onPress={onInfoPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Feather name="info" size={14} color="#555" />
    </TouchableOpacity>
  </TouchableOpacity>
  <Text style={[styles.orderSeparator,{color:'gray',backgroundColor:'white'}]}>{dateFormat}</Text>
  </View>
)};
const styles = StyleSheet.create({
orderSeparator: {
  alignSelf: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#87ceeb54',
  paddingHorizontal: 14,
  paddingVertical: 8,
  borderRadius: 20,
  marginVertical: 12,
  gap: 8,
},

orderSeparatorText: {
  fontSize: 12,
  color: '#444',
  fontFamily: Fonts.Medium,
},

});