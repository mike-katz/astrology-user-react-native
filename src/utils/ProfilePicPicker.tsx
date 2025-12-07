import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const {width} = Dimensions.get('window');
const GRID_GAP = 12;
const NUM_COLUMNS = 4;
const ITEM_SIZE = (width - 80 - (NUM_COLUMNS - 1) * GRID_GAP) / NUM_COLUMNS; // container padding 20

// Dummy avatars (replace with your real images or remote URLs)
const AVATARS = [
  { id: 'aries1', label: 'Aries', src: require('../assets/images/AriesProfilePic.png') },
  { id: 'aries2', label: 'Aries', src: require('../assets/images/AriesProfilePic.png') },
  { id: 'taurus1', label: 'Taurus', src: require('../assets/images/TaurusProfilePic.png') },
  { id: 'taurus2', label: 'Taurus', src: require('../assets/images/TaurusProfilePic.png') },
  { id: 'gemini1', label: 'Gemini', src: require('../assets/images/GeminiProfilePic.png') },
  { id: 'gemini2', label: 'Gemini', src: require('../assets/images/GeminiProfilePic.png') },
  { id: 'cancer1', label: 'Cancer', src: require('../assets/images/CancerProfilePic.png') },
  { id: 'cancer2', label: 'Cancer', src: require('../assets/images/CancerProfilePicTwo.png') },
  { id: 'leo1', label: 'Leo', src: require('../assets/images/LeoProfilePic.png') },
  { id: 'leo2', label: 'Leo', src: require('../assets/images/LeoProfilePicTwo.png') },
  { id: 'virgo1', label: 'Virgo', src: require('../assets/images/VirgoProfilePic.png') },
  { id: 'virgo2', label: 'Virgo', src: require('../assets/images/VirgoProfilePic.png') },
  { id: 'libra1', label: 'Libra', src: require('../assets/images/LibraProfilePic.png') },
  { id: 'libra2', label: 'Libra', src: require('../assets/images/LibraProfilePicTwo.png') },
  { id: 'scorpio1', label: 'Scorpio', src: require('../assets/images/ScorpioProfilePic.png') },
  { id: 'scorpio2', label: 'Scorpio', src: require('../assets/images/ScorpioProfilePicTwo.png') },
  { id: 'sagittarius1', label: 'Sagittarius', src: require('../assets/images/SagittariusProfilePic.png') },
  { id: 'sagittarius2', label: 'Sagittarius', src: require('../assets/images/SagittariusProfilePic.png') },
  { id: 'capricorn1', label: 'Capricorn', src: require('../assets/images/CapricornProfilePic.png') },
  { id: 'capricorn2', label: 'Capricorn', src: require('../assets/images/CapricornProfilePicTwo.png') },
  { id: 'aquarius1', label: 'Aquarius', src: require('../assets/images/AquariusProfilePic.png') },
  { id: 'aquarius2', label: 'Aquarius', src: require('../assets/images/AquariusProfilePic.png') },
  { id: 'pisces1', label: 'Pisces', src: require('../assets/images/PiscesProfilePic.png') },
  { id: 'pisces2', label: 'Pisces', src: require('../assets/images/PiscesProfilePic.png') },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect?: (item: any) => void;
  initialAvatar?: any; // optional currently selected avatar
};

export default function ProfilePicPicker({ visible, onClose, onSelect, initialAvatar }: Props) {
  const [selected, setSelected] = useState<string | null>(initialAvatar?.id || null);

  const selectItem = (item: any) => {
    setSelected(item.id);
    // if (onSelect) onSelect(item);
  };

  const renderItem = ({ item }: { item: any }) => {
    const isActive = selected === item.id;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => selectItem(item)}
        style={[styles.gridItem, { width: ITEM_SIZE, height: ITEM_SIZE + 28 }]}
      >
        <View style={[styles.avatarWrap, isActive && styles.avatarWrapActive]}>
          <Image source={item.src} style={styles.avatarImg} />
        </View>
        <Text numberOfLines={1} style={styles.avatarLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      {/* <Pressable style={styles.backdrop} onPress={onClose} /> */}
    <View style={styles.backdrop}>
      <SafeAreaView style={styles.centered} pointerEvents="box-none">
        <View style={styles.modalBox}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Change Profile Pic</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{top:10,left:10,right:10,bottom:10}}>
              <Text style={styles.closeX}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subTitle}>Select from Library</Text>

          <FlatList
            data={AVATARS}
            keyExtractor={(it) => it.id}
            renderItem={renderItem}
            numColumns={NUM_COLUMNS}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelTxt}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.applyBtn, !selected && styles.applyBtnDisabled]}
              onPress={() => {
                if (!selected) return;
                const item = AVATARS.find(a => a.id === selected);
                if (onSelect) onSelect(item);
                onClose();
              }}
              disabled={!selected}
            >
              <Text style={styles.applyTxt}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent:'center',
    alignItems:'center',
  },
  centered: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    height:'50%',
  },
  modalBox: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingTop: 10,
    paddingBottom: 14,
    // shadow
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 6,
  },
  title: { fontSize: 18, fontWeight: '600', color: '#222' },
  closeX: { fontSize: 20, color: '#333' },
  subTitle: { paddingHorizontal: 14, color: '#666', marginBottom: 8 },

  grid: {
    paddingHorizontal: 14,
    paddingBottom: 8,
  },
  gridItem: {
    marginRight: GRID_GAP,
    marginBottom: 12,
    alignItems: 'center',
  },
  avatarWrap: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    backgroundColor: '#FFF6D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  avatarWrapActive: {
    borderColor: '#F1C42B',
    backgroundColor: '#FFF9EB',
  },
  avatarImg: {
    width: ITEM_SIZE - 18,
    height: ITEM_SIZE - 18,
    borderRadius: (ITEM_SIZE - 18) / 2,
    resizeMode: 'cover',
  },
  avatarLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
    width: ITEM_SIZE,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginTop: 6,
  },
  cancelBtn: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#F1F1F1',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyBtn: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#F1C42B',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyBtnDisabled: { opacity: 0.6 },
  cancelTxt: { color: '#444', fontWeight: '600' },
  applyTxt: { color: '#111', fontWeight: '700' },
});
