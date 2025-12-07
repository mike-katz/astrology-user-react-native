import React, {Component} from 'react';
import {Platform, StatusBar, View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {BackIcon} from '../assets/icons';
import {Constants} from '../constant';
import {Fonts} from '../styles';

export const headerNoTitle = {
  title: ' ',
  headerBackTitle: ' ',
  headerStyle: {elevation: 0},
  headerShadowVisible: false,
};

export const headerTransparent = {
  headerShadowVisible: false,
  headerTransparent: true,
  headerTitle: ' ',
  headerTintColor: 'transparent',
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerTitleStyle: {
    // fontFamily: Fonts.Regular
  },
};

export const headerWithTitle = ({title, color = '#000'}: any) => {
  return {
    headerShown: true,
    headerBackTitle:' ',
    headerShadowVisible: false,
    headerTitleAlign: 'left',
    title: title,
    headerTintColor: color,
    headerTitleStyle: {
      fontFamily: Fonts.Medium,
      fontSize: 19,
    },
  };
};

export const headerWithLogo = ({navigation}: any) => {
  const topSpace = Platform.OS == 'ios' ? Constants.safeArea.top : 30;

  return (
    <View
      style={{
        paddingTop: topSpace,
        height: 50 + topSpace,
        backgroundColor: '#fff',
      }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FastImage
        source={require('../assets/images/back.png')}
        style={{height: 35, top: Platform.OS == 'android' ? 10 : 0}}
        resizeMode="contain"
      />
      <View style={{position: 'absolute', zIndex: 1, top: topSpace}}>
        <BackIcon onPress={navigation.goBack} />
      </View>
    </View>
  );
};

export const headerWithBackIconOnly = () => {
  return {
    ...headerNoTitle,
    headerBackImage: () => <BackIcon onPress={null} disabled={true} />,
  };
};

export const headerWithBackIconTitle =  ({navigation}: any) => {
  return {
    ...headerNoTitle,
    headerLeft:() =>(
      <TouchableOpacity
        onPress={navigation.goBack}
        style={styles.backContainer}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 0 }}
      >
        <BackIcon onPress={navigation.goBack}/>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>) ,
  };
};

export const headerWithGradient = ({title}: any) => {
  return {
    headerBackground: () => (
      <LinearGradient
        colors={['#214541', '#266346']}
        style={{flex: 1, backgroundColor: 'green'}}
        start={{x: 0.4, y: 0.3}}
      />
    ),
    ...headerWithTitle({title, color: '#fff'}),
  };
};

export const noHeader = {headerShown: false};
const styles = StyleSheet.create({
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backText: {
    fontSize: 20,
    color: '#000', // or your theme color
    marginLeft: 0, // spacing between icon and text
  },
});