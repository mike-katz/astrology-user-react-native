import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const BAR_COUNT = 25;
export default function AudioRecorderBar({
  duration,
  onCancel,
  onPause,
  onSend,
  paused,
}: any) {
    
// const bars = useMemo(() => Array.from({ length: BAR_COUNT }, () => Math.random() * 20 + 8),[]);
  const baseHeights = useMemo(
  () => Array.from({ length: BAR_COUNT }, () => 0.3 + Math.random() * 0.6),
  []
);
  const animatedBars = useRef(
      baseHeights.map(h => new Animated.Value(h))
    ).current;
const waveAnimations = useRef<Animated.CompositeAnimation[]>([]);

useEffect(() => {
startWaveAnimation();
    return () => {
    // cleanup when component unmounts
    stopWaveAnimation();
  };
}, []);

const startWaveAnimation = () => {
  waveAnimations.current = animatedBars.map((bar,i) =>
    Animated.loop(
      Animated.sequence([
        Animated.timing(bar, {
         toValue: Math.min(1, baseHeights[i] + Math.random() * 0.4),
          duration: 250 + Math.random() * 250,
          useNativeDriver: true,
        }),
        Animated.timing(bar, {
            toValue: baseHeights[i],
          duration: 250 + Math.random() * 250,
          useNativeDriver: true,
        }),
      ])
    )
  );

  Animated.parallel(waveAnimations.current).start();
};
const stopWaveAnimation = () => {
    waveAnimations.current.forEach(animation => {
    animation.stop(); // 🔥 this stops loop
  });
  animatedBars.forEach((bar, i) => {
    bar.stopAnimation();
    bar.setValue(baseHeights[i]); 
  });
  waveAnimations.current = [];
};

    
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{

        setTimeout(onCancel, 150);
      }}>
        <Feather name="trash-2" size={22} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.timer}>{duration}</Text>

      {/* Fake waveform */}
      <View style={styles.wave}>
         {/* {bars.map((h, i) => (
            <View
              key={i}
              style={[styles.waveBar, { height: h }]}
            />
          ))} */}
          {animatedBars.map((bar, i) => (
            <Animated.View
              key={i}
              style={[
                styles.waveBar,
                {
                  transform: [{ scaleY: bar }],
                  opacity: bar,
                },
              ]}
            />
          ))}
      </View>

      <TouchableOpacity onPress={()=>{
        onPause()
        {paused ?startWaveAnimation():stopWaveAnimation()}
        // {paused ?startWave():stopWave()}
      }}>
        <Feather
          name={paused ? 'play' : 'pause'}
          size={22}
          color="#ff5a5a"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{
        onSend()
        stopWaveAnimation();
      }} style={styles.sendBtn}>
        <Feather name="send" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    width: 3,
    height: 14,
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
