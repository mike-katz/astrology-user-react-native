import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { deleteProfileAction, getProfileList } from '../../redux/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearProfileList, removeProfileListItem, setProfileList } from '../../redux/slices/profileListSlice';
import moment from 'moment';
import { CustomDialogManager2 } from '../../utils/CustomDialog2';
import { decryptData, secretKey } from '../../services/requests';
import { Fonts } from '../../styles';

const MAX_PROFILES = 5;
type Props = {
  name:string;
  visible: boolean;
  onClose: () => void;
  onStartChat: (data:any) => void;
};
const ProfileSelector = ({ name, visible,onClose, onStartChat }: Props) => {
  const navigation = useNavigation<any>();
  const profilelist = useSelector((state: RootState) => state.profileList.profilelist);
  const [selectedId, setSelectedId] = useState('');

  const dispatch = useDispatch();
  useEffect(()=>{
    callProfileListApi();
  },[visible]);

useFocusEffect(
  React.useCallback(() => {
    if (!profilelist || profilelist.length === 0) return;

    setSelectedId(prevSelectedId => {
      // 1️⃣ If already selected AND still exists → keep it
      if (
        prevSelectedId &&
        profilelist.some(p => p.id === prevSelectedId)
      ) {
        return prevSelectedId;
      }

      // 2️⃣ Otherwise select first profile
      return profilelist[0].id;
    });
  }, [profilelist])
);

  const callProfileListApi = () => {
    // setActivity(false)
    getProfileList().then(response => {
      const result = JSON.parse(response);
      // console.log('Profile list response '+JSON.stringify(result));
      if (result.success == true){
          if(result.data.length > 0){
            dispatch(clearProfileList());
            dispatch(setProfileList(result.data));
            setSelectedId(result.data[0].id);
          }
      }else if(result.success == false){
          const result2 = decryptData(result.error,secretKey);
          const result3 = JSON.parse(result2);
          CustomDialogManager2.show({
              title: 'Alert',
              message: result3.message,
              type:2,
              buttons: [
              {
                  text: 'Ok',
                  onPress: () => {
                  
                  },
                  style: 'default',
              },
              ],
          });
        }
    });
  }

    const callProfileDeleteApi = (item:any) => {
    deleteProfileAction(item.id).then(response => {
      const result = JSON.parse(response);
      console.log('Profile delete response '+JSON.stringify(result.data));
      if (result.success == true){
        dispatch(removeProfileListItem(item?.id));
        if (selectedId === item.id) setSelectedId('');
        if (profilelist.length > 0){
            setSelectedId(profilelist[0].id);
        } 
                  if(Platform.OS==='ios'){
 Alert.alert(
                  "Profile Deleted",
                  result.message,
                  [
                  
                  {
                      text: "Ok",
                      onPress: () => {

            
            
                      },
                  },
                  ]
              );
          }else{
        CustomDialogManager2.show({
              title: 'Profile Deleted',
              message: result.message,
              type:1,
              buttons: [
              {
                  text: 'Ok',
                  onPress: () => {
                  
                  },
                  style: 'default',
              },
              ],
          });
        }
      }else if(result.success == false){
          const result2 = decryptData(result.error,secretKey);
          const result3 = JSON.parse(result2);
          if(Platform.OS==='ios'){
 Alert.alert(
                  "Alert",
                  result3.message,
                  [
                  
                  {
                      text: "Ok",
                      onPress: () => {

            
            
                      },
                  },
                  ]
              );
          }else{
          CustomDialogManager2.show({
              title: 'Alert',
              message: result3.message,
              type:2,
              buttons: [
              {
                  text: 'Ok',
                  onPress: () => {
                  
                  },
                  style: 'default',
              },
              ],
          });
          }
               

        }
    });
  }

  const onDelete = (item: any) => {
    callProfileDeleteApi(item);
  };

  const renderItem = ({ item }: any) => {
    const selected = selectedId === item.id;
    const formatted = moment(item.dob).format("DD MMM YY");
    const timeFormate = moment(item.birth_time,"HH:mm:ss").format("hh:mm A");
    return (
      <TouchableOpacity
        style={[styles.card, selected && styles.selectedCard]}
        onPress={() => setSelectedId(item.id)}
      >
        <View style={styles.left}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.name[0].toUpperCase()}
            </Text>
          </View>

          <View style={{ marginLeft: 12 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>{formatted} {timeFormate}</Text>
            <Text style={styles.sub}>{item.birth_place}</Text>
          </View>
        </View>

        <View style={styles.right}>
          <TouchableOpacity onPress={()=>{
                  if(Platform.OS==='ios')
                    onClose()

                  setSelectedId(item.id);
                  navigation.navigate("EditKundliScreen", {
                    onSelect: (data: any) => {
                        
                    },item,
                    });
          }}>
            <Feather name="edit-2" size={16} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onDelete(item)}>
            <Feather name="trash-2" size={18} color="red" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Close on outside tap */}
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={()=>onClose()}
        />

        {/* Bottom Sheet */}
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={()=>onClose()}>
              <Feather style={{color:'#939192'}} name="arrow-left" size={22} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Select Profile</Text>
          </View>

          {/* Add Profile */}
          {profilelist.length < MAX_PROFILES && (
            <TouchableOpacity style={styles.addCard} onPress={()=>{
              navigation.push("CreateProfileScreen");
              if(Platform.OS==='ios'){
                  onClose();
              }
            }}>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          )}

          {/* Profiles */}
          <FlatList
            data={profilelist}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />

          {/* CTA */}
          <TouchableOpacity style={styles.cta} onPress={()=>{
            const selectedProfile = profilelist.find(
                  (item: any) => item.id === selectedId
                );
              if (!selectedProfile) {
                  CustomDialogManager2.show({
                    title: 'Alert',
                    message: 'Please select a profile',
                    type: 2,
                    buttons: [{ text: 'Ok', style: 'default' }],
                  });
                  return;
                }

                onStartChat(selectedProfile); // 👈 pass data
          }}>
            <Text style={styles.ctaText}>Start chat with {name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileSelector;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)', // 👈 background visible
    justifyContent: 'flex-end',
  },

  container: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color:'#939192',
    fontFamily:Fonts.Medium
  },

  addCard: {
  backgroundColor: '#FFF',
  marginHorizontal: 16,
  borderRadius: 10,
  alignItems: 'center',
  paddingVertical: 4,
  marginBottom: 21,

  // iOS shadow (emboss / raised)
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,

  // Android shadow
  elevation: 4,

  // Optional border for crisp look
  borderWidth: 1,
  borderColor: '#EEE',
  },

  plus: {
    fontSize: 28,
    fontWeight: '600',
    color:'#939192',
    fontFamily:Fonts.Medium
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },

  selectedCard: {
    borderColor: '#22C55E',
    borderWidth: 2,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  right: {
    flexDirection: 'row',
    gap: 14,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
    fontFamily:Fonts.Medium
  },

  name: {
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'capitalize',
    fontFamily:Fonts.Medium
  },

  sub: {
    fontSize: 12,
    color: '#666',
    fontFamily:Fonts.Medium
  },

  cta: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#FACC15',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily:Fonts.Medium
  },
});
