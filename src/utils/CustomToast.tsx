import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Fonts} from '../styles';

const initialToast = {
  heading: '',
  message: '',
  type: null,
  visible: false,
  onPress: null,
};

const ToastContext = React.createContext({});

class StaticToast {
  static toast: any = null;
}

const ToastProvider = ({children}: any) => {
  const [toast, setToast] = React.useState(initialToast);
  const timeout: any = React.useRef();

  React.useEffect(() => {
    if (toast.visible) {
      timeout.current = setTimeout(hide, 5000);
      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      };
    }
  }, [toast]);

  const show = React.useCallback(args => {
    setToast({...initialToast, visible: true, ...args});
  }, []);

  const hide = React.useCallback(() => {
    setToast({...toast, visible: false});
  }, [toast]);

  return (
    <ToastContext.Provider
      value={{
        hide,
        show,
        toast,
      }}>
      {children}
    </ToastContext.Provider>
  );
};

const Types = {
  Success: 'Success',
  Error: 'Error',
  Notification: 'Notification',
};

const Colors: any = {
  Success: '#7AAD37',
  Error: '#D20000',
  Notification: '#266746',
};

const height = 80;

function CustomToast() {
  const insets = useSafeAreaInsets().top || 20;
  const toastAnimation = React.useRef(new Animated.Value(0)).current;
  const {toast, hide, show}: any = React.useContext(ToastContext);

  React.useEffect(() => {
    StaticToast.toast = show;

    if (toast.visible) {
      togglePopup(1);
    } else {
      togglePopup(0);
    }
  }, [toast]);

  const togglePopup = (toValue = 0) => {
    Animated.spring(toastAnimation, {toValue, useNativeDriver: true}).start();
  };

  const onPress = () => {
    if (typeof toast.onPress == 'function') {
      toast.onPress();
    }
    hide();
  };

  const translateY = toastAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-(height + insets + 50), 0],
  });
  const backgroundColor = Colors[toast.type];
  // toast.type == Types.Success ? Colors.Success : Colors.Error;

  return (
    <Animated.View style={[style.container, {transform: [{translateY}]}]}>
      <TouchableOpacity
        activeOpacity={1}
        // onPress={hide}
        onPress={onPress}
        style={[
          style.toastContainer,
          {paddingTop: insets, paddingBottom: 10, backgroundColor},
        ]}>
        <View style={{flex: 1}}>
          <Text style={style.headingStyle}>{toast.heading}</Text>
          <Text style={style.textStyle} numberOfLines={3}>
            {toast.message}
          </Text>
        </View>
        <View
          style={{
            width: 25,
            height: 25,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#CCCCCC',
          }}>
          <FastImage
            source={require('../assets/icons/cross.png')}
            style={{width: 12, height: 12}}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const Toast = () => {
  return (
    <ToastProvider>
      <CustomToast />
    </ToastProvider>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },

  toastContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },

  headingStyle: {
    fontSize: 18,
    fontFamily: Fonts.SemiBold,
    lineHeight: 27,
    color: '#fff',
  },
  textStyle: {
    fontSize: 16,
    fontFamily: Fonts.Medium,
    lineHeight: 23,
    color: '#fff',
  },
});

export interface showToastInterface {
  heading: string;
  message: string;
  type: 'Success' | 'Error' | 'Notification';
  onPress: any;
}

export const showToastMessage = (props: showToastInterface) => {
  StaticToast?.toast({
    heading: props.heading,
    message: props.message,
    type: props.type,
    onPress: props.onPress,
  });
};

export default Toast;
