import { Dimensions, StyleSheet, StatusBar, Platform } from 'react-native';
import { shadows } from './shadow';
import { Constants } from '../constant';


const { width, height } = Dimensions.get('screen');

export const Size = {
  MaxWidth: width,
  MaxHeight: height,
};

export const shadow = {
  s1: shadows[0],
  s2: shadows[1],
  s3: shadows[2],
  s4: shadows[3],
  s5: shadows[4],
  s6: shadows[5],
  s7: shadows[6],
  s8: shadows[7],
  s9: shadows[8],
  s10: shadows[9],
  s11: shadows[10],
  s12: shadows[11],
  s13: shadows[12],
  s14: shadows[13],
  s15: shadows[14],
  s16: shadows[15],
  s17: shadows[16],
  s18: shadows[17],
  s19: shadows[18],
  s20: shadows[19],
  s21: shadows[20],
  s22: shadows[21],
  s23: shadows[22],
  s24: shadows[23],
};

export const colors = {
  primaryDark: '#25484A',
  lightGreen: '#7AAD37',
  darkGreen: '#276D47',
  ButtunGradientColor: ["#800080", "#00000033"],
  Buttondisabled: "#B0B0B0",
  TextHeader: "#000000",
  primaryColor:'#FBB917',
  // primaryColor:'#800080',
  primaryLightColor:'#FFFAE6'
};

export const Fonts = {
  Regular: 'OpenSans-Regular',
  Medium: 'OpenSans-Medium',
  SemiBold: 'OpenSans-SemiBold',
  Bold: 'OpenSans-Bold',
  Italic: 'OpenSans-Italic',
};

export const commonStyles = StyleSheet.create({
  activeLink: {
    color: colors.lightGreen,
    textDecorationLine: 'underline',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});





