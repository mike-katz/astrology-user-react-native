import React, { useEffect, useState } from 'react';
import {
  View, Modal, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView,
  useColorScheme,
  Alert
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import StarRating from 'react-native-star-rating-widget';
import { colors, Fonts } from '../styles';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import FastImage from 'react-native-fast-image';
import { getChatInfoOrder } from '../redux/actions/UserActions';
import { decryptData, secretKey } from '../services/requests';

const RateAstrologerModal = ({ visible,data, onClose, onSubmit }:any) => {
  const [rating, setRating] = useState(0);
  const colorScheme = useColorScheme();
  const [review, setReview] = useState("");
  const [hideName, setHideName] = useState(false);
   const userDetailsData = useSelector((state: RootState) => state.userDetails.userDetails);

   useEffect(()=>{
    if(!data) return;
   },[]);

useEffect(()=>{
  callInfoOrder();
},[data]);
   
const callInfoOrder=()=>{
      getChatInfoOrder(data.order_id).then(response => {
          const result = JSON.parse(response);
          if (result.success === true) {
          const ratingNum = Number(result?.data?.rating);
          setRating(Number.isFinite(ratingNum) ? ratingNum : 0);
          
            setReview(result.data.message);
          } else if (result.success === false) {
              const result2 = decryptData(result.error, secretKey);
              const result3 = JSON.parse(result2);
          }
      });
}

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          
          <Text style={styles.title}>Rate Astrologer</Text>
           
           {/* Close */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Feather name="x" size={24} color="#333" />
          </TouchableOpacity>

          {/* Center Icon */}
          <FastImage source={require('../assets/icons/astrologer_logo.png')} style={styles.centerIcon} />

          {/* User */}
          <View style={styles.userRow}>
            
            <FastImage
                source={{uri:userDetailsData.profile}}
                style={styles.userImg}
                />
            <View>
              <Text style={styles.userName}>{userDetailsData?.name||'User'}</Text>
              <Text style={styles.note}>Reviews are public if you are not anonymous</Text>
            {/* Checkbox */}
            <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setHideName(!hideName)}>
                <Feather name={hideName ? "check-square" : "square"} size={15} color="#333" />
                <Text style={styles.checkboxText}>Hide my name from all public reviews</Text>
            </TouchableOpacity>
            </View>
          </View>

   

          {/* Rating */}
       
            <StarRating style={{alignSelf:'center'}} rating={rating} onChange={setRating} starSize={35} color={colors.primaryColor} />
          
          {/* Feedback */}
          <View style={styles.inputBox}>
            <TextInput
              value={review}
              onChangeText={setReview}
              placeholder="Describe your experience (optional)"
              
              multiline
              maxLength={160}
              style={styles.textArea}
                              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
                              cursorColor={colors.primaryColor}
            />
            
          </View>
          <Text style={styles.counter}>{(review?.length ?? 0)}/160</Text>

          {/* Submit */}
          <TouchableOpacity style={styles.submitBtn} onPress={()=>{
                onSubmit({
                rating,
                review,
                hideName,
                userId: userDetailsData?.id,
                userName: userDetailsData?.name,
                profile: userDetailsData?.profile,
                data
                });
                onClose();
          }}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default RateAstrologerModal;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 25,
    paddingHorizontal: 20,
    elevation: 12,
  },
  closeBtn: {
    position: 'absolute',
    right: 18,
    top: 18,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: '#000',
    fontFamily:Fonts.Medium
  },
  centerIcon: {
    width: 78,
    height: 78,
    alignSelf: 'center',
    marginVertical: 18,
    borderRadius: 40,
  },
  userRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: 6,
    marginBottom:6,
  },
  userImg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
    backgroundColor: '#FFFAE6',        // light yellow fill
    borderWidth: 2,
    borderColor: colors.primaryColor, 
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily:Fonts.Medium
  },
  note: {
    fontSize: 11,
    color: '#666',
    fontFamily:Fonts.Medium
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 6,
  },
  checkboxText: {
    fontSize: 11,
    color: '#000',
    fontFamily:Fonts.Medium
  },
  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 18,
    padding: 12,
    height: 110,
  },
  textArea: {
    fontSize: 14,
    color: '#000',
    height: '100%',
    fontFamily:Fonts.Medium
  },
  counter: {
    textAlign: 'right',
    color: '#444',
    fontSize: 11,
    fontFamily:Fonts.Medium
  },
  submitBtn: {
    backgroundColor: '#F9D535',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  submitText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    fontFamily:Fonts.Medium
  },
});
