import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import GurujiLogo from '../../assets/icons/GurujiLogo';
import { colors, Fonts } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import AstrotalkGuruji from '../../assets/icons/AstrotalkGuruji';

const GurujiCongrats = () => {
 const navigation = useNavigation<any>();
   const handleExploreMore = () => {
        navigation.goBack();
    }
  return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
      
      {/* Explore More (Top Right) */}
      <Pressable style={styles.exploreText} onPress={handleExploreMore}><Text >Explore more</Text></Pressable>

      {/* Logo */}
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/icons/astrologer_logo.png')}
              style={styles.logo}
            />
          </View>

      {/* Title */}
      {/* <Text style={styles.title}>
        Astrotalk{'\n'}
        <Text style={styles.title}>Guruji</Text>
      </Text> */}
       <AstrotalkGuruji />

      {/* Congratulations Text */}
      <Text style={styles.congratsText}>
        Congratulations you got a
      </Text>
      <Text style={styles.freeChatText}>Free Chat!</Text>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Start Button */}
      <TouchableOpacity style={styles.startBtn} onPress={() => navigation.push('FreeChatSteps')}>
        <Text style={styles.startBtnText}>Start Free Chat</Text>
      </TouchableOpacity>

           </SafeAreaView>
       </SafeAreaProvider>
  );
};

export default GurujiCongrats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  exploreText: {
    alignSelf: 'flex-end',
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    fontFamily:Fonts.SemiBold
  },
    logoContainer: {
    marginTop: 40,
    marginBottom: 15,
  },
  logo: {
    width: 160,
    height: 160,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    color: '#FBB917',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 40,
    fontFamily:Fonts.SemiBold
  },
  congratsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginTop: 40,
    textAlign: 'center',
      fontFamily:Fonts.SemiBold
  },
  freeChatText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryColor,
    marginTop: 5,
    textAlign: 'center',
    fontFamily:Fonts.SemiBold
  },
  startBtn: {
    width: '100%',
    backgroundColor: colors.primaryColor,
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  startBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    fontFamily:Fonts.Medium
  },
});
