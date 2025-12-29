import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Fonts } from '../styles';
import moment from 'moment';
import { StarRating } from '../constant/Helper';
import { useEffect, useState } from 'react';
import { getChatInfoOrder } from '../redux/actions/UserActions';
import { decryptData, secretKey } from '../services/requests';

type Props = {
  orderId: string;
 
  onPress?: () => void;
  onEdit?: () => void;
};

export const ReviewSeparator = ({ orderId, onPress, onEdit }: Props) => {
       const [ratingStar, setRatingStar] = useState(0);
       const [message, setMessage] = useState("");
    useEffect(()=>{
      callInfoOrder();
    },[orderId]);

      const callInfoOrder=()=>{
            getChatInfoOrder(orderId).then(response => {
                console.log("Info Order response ==>" + (response));
                const result = JSON.parse(response);
                if (result.success === true) {
                  setRatingStar(result.data.rating);
                  setMessage(result.data.message);
                } else if (result.success === false) {
                    const result2 = decryptData(result.error, secretKey);
                    const result3 = JSON.parse(result2);
                    console.log("Info Order Error response ==>" + JSON.stringify(result3));
                }
            });
      }
    return(
      <View style={styles.ratingRow}>
                    <View style={{ marginRight: 40 }}>
                        <View style={{ marginLeft: 5, flexDirection: "row", alignItems: "center" }}>
                            <StarRating size={20} rating={ratingStar} />
                        </View>
                        <Text style={styles.ratingLabel}>{message}</Text>
                    </View>
                    <TouchableOpacity onPress={onEdit} style={{ flex: 1, position: 'absolute', right: 20, alignItems:'center' }}>
                        <Feather name="edit-2" size={16} color="#555" />
                    </TouchableOpacity>
                </View> 
)};
const styles = StyleSheet.create({
    // rating row
    ratingRow: { 
      flexDirection: "row", 
      alignItems: "center", 
      paddingHorizontal: 10,
      paddingVertical:10, 
      marginBottom: 6,
      marginTop:6,
      backgroundColor:'#FFF',
      borderRadius: 12, },
    ratingLabel: { marginLeft: 10, color: "#333", fontWeight: "600", fontFamily: Fonts.Medium },

});