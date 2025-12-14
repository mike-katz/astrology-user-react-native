import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function AudioRecorderBar({
  duration,
  onCancel,
  onPause,
  onSend,
  paused,
}: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onCancel}>
        <Feather name="trash-2" size={22} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.timer}>{duration}</Text>

      {/* Fake waveform */}
      <View style={styles.wave}>
        <View style={styles.waveBar} />
        <View style={[styles.waveBar, { height: 14 }]} />
        <View style={[styles.waveBar, { height: 20 }]} />
        <View style={[styles.waveBar, { height: 12 }]} />
      </View>

      <TouchableOpacity onPress={onPause}>
        <Feather
          name={paused ? 'play' : 'pause'}
          size={22}
          color="#ff5a5a"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onSend} style={styles.sendBtn}>
        <Feather name="send" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position:'absolute',
    // bottom:0,
    // width:'100%',
    height: 70,
    backgroundColor: '#1f1f1f',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  timer: {
    color: '#fff',
    marginHorizontal: 10,
    fontSize: 16,
  },
  wave: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  waveBar: {
    width: 4,
    height: 8,
    backgroundColor: '#fff',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  sendBtn: {
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
});
