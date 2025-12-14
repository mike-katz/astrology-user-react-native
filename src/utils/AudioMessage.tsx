import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  uri: string;
  duration?: number;
  isUser: boolean;
};

export const AudioMessage = ({ uri, duration = 0, isUser }: Props) => {
  const [sound, setSound] = useState<Sound | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const s = new Sound(uri, undefined, (error) => {
      if (!error) setSound(s);
    });

    return () => {
      s.release();
    };
  }, [uri]);

  const togglePlay = () => {
    if (!sound) return;

    if (playing) {
      sound.pause();
      setPlaying(false);
    } else {
      sound.play(() => setPlaying(false));
      setPlaying(true);
    }
  };

  return (
    <View style={[
      styles.container,
      isUser ? styles.userBubble : styles.agentBubble
    ]}>
      <TouchableOpacity onPress={togglePlay} style={styles.playBtn}>
        <Feather
          name={playing ? 'pause' : 'play'}
          size={20}
          color="#fff"
        />
      </TouchableOpacity>

      {/* fake waveform (WhatsApp look) */}
      <View style={styles.wave}>
        <View style={styles.waveLine} />
        <View style={styles.waveLine} />
        <View style={styles.waveLine} />
        <View style={styles.waveLine} />
        <View style={styles.waveLine} />
      </View>

      <Text style={styles.timeText}>
        0:{duration < 10 ? `0${duration}` : duration}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 18,
    maxWidth: '75%',
  },

  userBubble: {
    backgroundColor: '#0B9E55', // WhatsApp green
    alignSelf: 'flex-end',
  },

  agentBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    borderColor: '#ddd',
  },

  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  wave: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  waveLine: {
    width: 3,
    height: 14,
    backgroundColor: '#fff',
    marginHorizontal: 2,
    borderRadius: 2,
  },

  timeText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 8,
  },
});
