import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Modal, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  position: { x: number; y: number } | null;
};

export const MessageContextMenu = ({ visible, onClose ,onDelete, position}: Props) => {
    if (!visible || !position) return null;
  return (
    <Modal
      visible={visible}
        transparent 
        animationType="fade"
    >
              {/* Backdrop */}
      <Pressable style={styles.overlay} onPress={onClose}>
        {/* Prevent closing when clicking menu */}
      <View 
      style={[
            styles.container,
            {
              top: position.y + 8,
              left: position.x - 130, // center align (menu width / 2)
            },
          ]}
    //   style={styles.container}
      >
        {/* Emoji Row */}
        {/* <View style={styles.reactionRow}>
          {['👍', '❤️', '😂', '😮', '😢', '🙏', '🌹'].map((emoji, index) => (
            <TouchableOpacity key={index} style={styles.emojiBtn}>
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.plusBtn}>
            <Text style={styles.plus}>＋</Text>
          </TouchableOpacity>
        </View> */}

        {/* Menu Card */}
        <View style={styles.menuCard}>
          {/* {menuItem('Reply', 'corner-up-left')}
          {menuItem('Forward', 'corner-up-right')}
          {menuItem('Copy', 'copy')}
          {menuItem('Info', 'info')}
          {menuItem('Star', 'star')} */}
          {menuItem('Delete', 'trash', true,onDelete)}
          {/* {menuItem('More...', 'more-horizontal')} */}
        </View>
      </View>
      </Pressable>
    </Modal>
  );
};

const menuItem = (label: string, icon: string, danger = false,onDelete:any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
    <Text style={[styles.menuText, danger && { color: '#ff4d4f' }]}>
      {label}
    </Text>
    <Feather
      name={icon}
      size={18}
      color={danger ? '#ff4d4f' : '#fff'}
    />
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    alignItems: 'center',
    // backgroundColor: "rgba(0,0,0,0.45)",
  },

  reactionRow: {
    flexDirection: 'row',
    backgroundColor: '#1f1f1f',
    borderRadius: 30,
    padding: 8,
    marginBottom: 10,
  },

  emojiBtn: {
    paddingHorizontal: 6,
  },

  emoji: {
    fontSize: 22,
  },

  plusBtn: {
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  plus: {
    color: '#aaa',
    fontSize: 20,
  },

  menuCard: {
    width: 210,
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    paddingVertical: 6,
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  menuText: {
    fontSize: 16,
    color: '#fff',
  },

  messageBubble: {
    backgroundColor: '#0b806a',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 12,
    margin: 10,
    maxWidth: '70%',
  },

  messageText: {
    color: '#fff',
    fontSize: 16,
  },

  time: {
    fontSize: 11,
    color: '#dcdcdc',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
});
