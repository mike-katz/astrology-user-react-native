import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Share, Animated, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import OrderHistoryIcon from '../../assets/icons/OrderHistoryIcon';
import { useNavigation } from '@react-navigation/native';
import { BackIcon } from '../../assets/icons';
import ShareIcon from '../../assets/icons/ShareIcon';
import { colors, Fonts } from '../../styles';
import ChatWhiteIcon from '../../assets/icons/ChatWhiteIcon';

const WebviewScreen = ({route}:any) => {
    const { link_web } = route.params;
    const navigation = useNavigation<any>();
      
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const [loading, setLoading] = React.useState(true); 
    React.useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 5000);
      return () => clearTimeout(timer);
    }, []);

    // Interpolate header background opacity
    const headerBackgroundColor = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
        extrapolate: 'clamp',
    });
    const handleBack = () => {
        navigation.goBack();
    }
    
    const handleShare = async () => {
          try {
          const result = await Share.share({
            message: `${link_web}`,
          });

          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              console.log('Shared with activity type:', result.activityType);
            } else {
              console.log('Shared successfully');
            }
          } else if (result.action === Share.dismissedAction) {
            console.log('Share dismissed');
          }
        } catch (error) {
          console.error('Error sharing referral code:', error);
        }
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>

                {/* ---------- Animated HEADER ---------- */}
                <Animated.View   style={[
                            styles.header,
                            // { backgroundColor: headerBackgroundColor }
                        ]}>
               

                    <Text style={styles.headerTitle}>Blog</Text>

                    <TouchableOpacity style={styles.backBtn}>
                        <BackIcon size={16} onPress={handleBack} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
                        <ShareIcon
                            width={30} height={30}
                        />
                    </TouchableOpacity>
                    <View style={{ position:'absolute',width:'100%', height: .1,backgroundColor:'#7B7B7B',bottom:0 }}></View>
                </Animated.View>

        <View style={{ flex: 1 }}>
            {loading && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.primaryColor} />
                <Text style={{ marginTop: 8, fontSize: 14 }}>Loading...</Text>
              </View>
            )}
                {/* ---------- WEBVIEW ---------- */}
                <WebView
                    source={{ uri: link_web }}
                    style={{ flex: 1 }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    setSupportMultipleWindows={false}
                    userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
                    scrollEventThrottle={16}
                    onScroll={(event) => {
                        scrollY.setValue(event.nativeEvent.contentOffset.y);
                    }}
                />
</View>
                {/* ---------- FLOATING BUTTON ---------- */}
                <View style={styles.floatingWrap}>
                    <Pressable style={styles.floatingBtn}  onPress={() => navigation.navigate('MainTabs', { screen: 'Chat' })}>
                        
                         <ChatWhiteIcon style={styles.icon}/>
                        <Text style={styles.floatingText}>Free Chat with Astrologer</Text>
                    </Pressable>
                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default WebviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
    },
    header: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // paddingHorizontal: 15,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerTitle: {
        position: 'absolute',
        textAlign: 'center',
        left: 0,
        right: 0,
        fontSize: 20,
        fontWeight: "500",
        color: "#000",
        fontFamily:Fonts.Medium
    },
    backBtn: {
        width: 60,
        height: 40,
        justifyContent: "center",
        paddingLeft: 10,
    },
    shareBtn: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 15,
    },
        loaderContainer: {
      position: 'absolute',
      top: '45%',
      left: 0,
      right: 0,
      alignItems: 'center',
      zIndex: 100,
    },

    // Floating Button Wrapper
    floatingWrap: {
        position: "absolute",
        bottom: '5%',
        left: 0,
        right: 0,
        alignItems: "center",
    },

    floatingBtn: {
        flexDirection: "row",
        backgroundColor: colors.primaryColor,
        width: "92%",
        paddingVertical: 15,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",

        // SHADOW
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 6,
    },

    icon: {
        fontSize: 18,
        marginRight: 10,
    },

    floatingText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
        fontFamily:Fonts.SemiBold
    },
});
