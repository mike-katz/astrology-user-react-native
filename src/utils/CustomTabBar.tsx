import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Platform, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import HomeTab from '../assets/icons/HomeTab';
import HomeTabDisable from '../assets/icons/HomeTabDisable';
import CallTab from '../assets/icons/CallTab';
import CallTabDisable from '../assets/icons/CallTabDisable';
import RemediesTab from '../assets/icons/RemediesTab';
import RemediesTabDisable from '../assets/icons/RemediesTabDisable';
import { Fonts } from '../styles';
import ChatTab from '../assets/icons/ChatTab';
import ChatTabDisable from '../assets/icons/ChatTabDisable';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const ICON_WIDTH = 33;
  const ICON_HEIGHT = 25;
  return (
   
    <View style={styles.container}>
      
    {state.routes.map((route, index) => {

        const isFocused = state.index === index;
        let tabName = 'Home';
        switch (route.name) {
          case 'Home':
            tabName='Home';
            break;
          case 'Chat':
            tabName='Chat';
            break;
       
          // case 'Live':
          //  tabName='Live';
          //   break;

          case 'Call':
            tabName='Call';
            break;

          case 'Remedies':
            tabName='Remedies';
            break;
        }

        const getTabIcon = (routeName: string, isFocused: boolean) => {
            switch (routeName) {
              case 'Home':
                return isFocused ? <HomeTab width={ICON_WIDTH} height={ICON_HEIGHT}/> : <HomeTabDisable width={ICON_WIDTH} height={ICON_HEIGHT}/>;
              case 'Chat':
                return isFocused ? <ChatTab width={ICON_WIDTH} height={ICON_HEIGHT} /> : <ChatTabDisable width={ICON_WIDTH} height={ICON_HEIGHT}/>;
              // case 'Live':
              //   return isFocused ? <PortfolioTab width={ICON_WIDTH} height={ICON_HEIGHT} /> : <PortfolioTabDisable width={ICON_WIDTH} height={ICON_HEIGHT}/>;
              case 'Call':
                return isFocused ? <CallTab width={ICON_WIDTH} height={ICON_HEIGHT} /> : <CallTabDisable width={ICON_WIDTH} height={ICON_HEIGHT}/>;
              case 'Remedies':
                return isFocused ? <RemediesTab width={ICON_WIDTH} height={ICON_HEIGHT}/> : <RemediesTabDisable width={ICON_WIDTH} height={ICON_HEIGHT}/>;
              default:
                return null;
            }
          };

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.8}>
            <View style={{marginLeft:4}}>   
                {getTabIcon(route.name, isFocused)}
             </View> 
            <Text style={{ fontFamily:Fonts.Regular,color: isFocused ? '#000' : '#7B7B7B',fontSize: 10,marginBottom:7}}>{tabName}</Text>    
          </TouchableOpacity>
        );
      })}
       
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: Platform.OS === 'ios' ? '12%' : '12%', //100 and 80 are the heights for iOS and Android respectively
    borderTopLeftRadius: 20,//30
    borderTopRightRadius: 20, //30
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100, // ensure it's above the screen
    paddingBottom:Platform.OS === 'android' ?26:8
  },
  tabButton: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? '4%' : 0, // Adjust for iOS
  },
});

export default CustomTabBar;
