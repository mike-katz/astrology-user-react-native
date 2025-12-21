import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Sound from 'react-native-nitro-sound';
import Slider from '@react-native-community/slider';
type Props = {
   audioId: string;
  uri: string;
  isUser: boolean;
    activeAudioId: string | null;
  onRequestPlay: (id: string) => void;
};
const BAR_COUNT = 20;
export const AudioMessage = ({ audioId,uri, isUser ,activeAudioId,onRequestPlay}: Props) => {
  // const bars = useMemo(() => Array.from({ length: BAR_COUNT }, () => Math.random() * 14 + 6),[]);
  const baseHeights = useMemo(
  () => Array.from({ length: BAR_COUNT }, () => 0.3 + Math.random() * 0.6),
  []
);
  const animatedBars = useRef(
      baseHeights.map(h => new Animated.Value(h))
    ).current;
const waveAnimations = useRef<Animated.CompositeAnimation[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playTime, setPlayTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [durationNum, setDurationNum] = useState(0);
  const [playbackPosition, setPlaybackPosition] = useState(0);

  const togglePlay = () => {
    // if (!sound) return;
    if (isPlaying) {
        onStopPlay();
    } else {
        onStartPlay();
    }
  };

  const startWaveAnimation = () => {
  waveAnimations.current = animatedBars.map((bar, i) =>
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

useEffect(() => {
  if (activeAudioId !== audioId) {
    // 🔥 another audio was clicked → reset UI
    // Sound.stopPlayer();
    // Sound.removePlayBackListener();

    setIsPlaying(false);
    setPlaybackPosition(0);
    setPlayTime('00:00');
    stopWaveAnimation();
    // durationSetRef.current = false;
  }
}, [activeAudioId]);

 const onStartPlay = async () => {
   onRequestPlay(audioId); 
    setIsLoading(true);
    try {
      const msg = await Sound.startPlayer(uri);
      Sound.addPlayBackListener((e) => {
        setPlayTime(Sound.mmssss(Math.floor(e.currentPosition)));
        setDuration(Sound.mmssss(Math.floor(e.duration)));
        setDurationNum(e.duration);
        setPlaybackPosition(e.currentPosition);
      });

      // Use the proper playback end listener
      Sound.addPlaybackEndListener((e) => {
        console.log('Playback completed', e);
        setIsPlaying(false);
        setPlayTime('00:00');
        setDurationNum(e.duration);
        setPlaybackPosition(e.currentPosition);
        stopWaveAnimation();
      });
      

      startWaveAnimation();
      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to start playback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onStopPlay = async () => {
    setIsLoading(true);
    
    try {
      await Sound.stopPlayer();
      Sound.removePlayBackListener();
      Sound.removePlaybackEndListener();
      stopWaveAnimation(); 
      setIsPlaying(false);
      setPlayTime('00:00');
      // setDuration('00:00');
       
    } catch (error) {
      console.error('Failed to stop playback:', error);
       
    } finally {
      setIsLoading(false);
       
    }
  };



  return (
    <View style={[
      styles.container,
      isUser ? styles.userBubble : styles.agentBubble
    ]}>
      <TouchableOpacity onPress={togglePlay} style={[
    styles.playBtn,
    isLoading && styles.disabledBtn, // 👈 change UI
  ]} disabled={isLoading} >
        <Feather
          name={isPlaying ? 'pause' : 'play'}
          size={20}
          color="#fff"
        />
      </TouchableOpacity>

      {/* fake waveform (WhatsApp look) */}
      <View style={{  flex: 1,alignItems:'center'}}>
      <View style={styles.wave}>

          {/* {bars.map((h, i) => (
            <View
              key={i}
              style={[styles.waveLine, { height: h }]}
            />
          ))} */}

            {animatedBars.map((bar, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.waveLine,
                  {
                    transform: [{ scaleY: bar }],
                    opacity: bar,
                  },
                ]}
              />
            ))}
      </View>
      
      <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={Math.max(1, durationNum)}
          value={playbackPosition}
          onSlidingComplete={(v) => Sound.seekToPlayer(v)}
           disabled={true}
        />
        </View>
      

      <Text style={styles.timeText}>
          {duration}
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
    borderRadius: 11,
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
    disabledBtn: {
    backgroundColor: '#9E9E9E',
    opacity: 0.6,
  },

  wave: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom:5
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
  slider: { width: '100%',marginBottom:-7},
});
