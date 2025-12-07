import React from 'react';
import {View, FlatList, StyleSheet, Text, StatusBar, Platform, TouchableOpacity, Alert, Image} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Fonts } from '../../styles';
import HelpIcon from '../../assets/icons/HelpIcon';
import WalletPlusIcon from '../../assets/icons/WalletPlusIcon';
import WalletIcon from '../../assets/icons/WalletIcon';
import MenuIcon from '../../assets/icons/MenuIcon';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const LiveScreen = () =>{

    return(
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
                          {/* Header */}
      <View style={styles.header}>
        {/* Profile Image wrapper */}
      <TouchableOpacity style={styles.profileWrapper}>
        <Image
          source={{uri:'https://aws.astrotalk.com/consultant_pic/p-115847.jpg'}}
          style={styles.profileImage}
        />
          
          {/* Menu icon on bottom-right */}
          <TouchableOpacity style={styles.menuIconContainer}>
            <MenuIcon
              width={8} height={6}
            />
          </TouchableOpacity>
      </TouchableOpacity>

  

        <Text style={styles.welcomeText}>Hi, Ankit</Text>

        <TouchableOpacity style={styles.addCashBtn}>
           <WalletIcon width={12} height={12}
            style={styles.walletIcon}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.addCashText}>Add Cash</Text>
            <WalletPlusIcon width={12} height={12} style={{ marginLeft: 6 }} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('Help clicked')} style={{ backgroundColor:'#FFF',padding:5,borderRadius:30 }}>
          <HelpIcon
            width={30} height={30}
          />
        </TouchableOpacity>
      </View>
        <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
        />
        </SafeAreaView>
    </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS==='android'?0:0 || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 5,
    },
  
profileWrapper: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#FFFAE6',        // light yellow fill
    borderWidth: 2,
    borderColor: '#F1C42B',           // yellow border
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
  },

  menuIconContainer: {
    position: 'absolute',
    bottom: 2,
    right: -4,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  
    welcomeText: {
      flex: 1,
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 10,
    },
  
  addCashBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderColor:'#000',
    borderWidth:.6,
  },

  addCashText: { 
    fontSize: 12, 
    fontWeight: '500',
    fontFamily: Fonts.Medium,
  },
  walletIcon: {
    marginRight: 6,
  },
  
});

export default LiveScreen;