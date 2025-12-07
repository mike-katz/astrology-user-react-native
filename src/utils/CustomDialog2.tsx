// CustomDialog.tsx
import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, Text, TouchableOpacity, Pressable, StatusBar, useColorScheme } from 'react-native';
import { colors, Fonts } from '../styles';
import SuccessIcon from '../assets/icons/SuccessIcon';
import QuestionIcon from '../assets/icons/QuestionIcon';
import ErrorIcon from '../assets/icons/ErrorIcon';
import KYCAlertIcon from '../assets/icons/KYCAlertIcon';
import * as Animatable from 'react-native-animatable';
import DeleteAccountIcon from '../assets/icons/DeleteAccountIcon';
interface DialogProps {
  title: string;
  message: string;
  type:number;
  buttons: {
    text: string;
    onPress?: () => void;
    style?: 'default' | 'destructive' | 'cancel';
  }[];
}

// Global reference, assigned at runtime
let showDialog: ((params: DialogProps) => void) | null = null;


export const CustomDialogManager2 = {
  show: (params: DialogProps) => {
    if (showDialog) {
      showDialog(params);
    } else {
      console.warn('CustomDialog not mounted yet');
    }
  },
};

const CustomDialogComponent = () => {
  
  const [visible, setVisible] = useState(false);
  const [dialog, setDialog] = useState<DialogProps>({
    title: '',
    message: '',
    type:1,
    buttons: [],
  });

  useEffect(() => {
    // Register global function
    showDialog = (params: DialogProps) => {
      setDialog(params);
      setVisible(true);
    };

    // Cleanup
    return () => {
      showDialog = null;
    };
  }, []);

  const close = () => setVisible(false);

  const renderDialogIcon = () => {
  switch (dialog.type) {
    case 1:
      return <SuccessIcon width={80} height={80} />;
    case 2:
      return <ErrorIcon width={80} height={80} />;
    case 3:
      return <QuestionIcon width={80} height={80} />;
    case 4:
      return <KYCAlertIcon width={80} height={80} />;
    case 5:
      return <DeleteAccountIcon width={80} height={80} />  
    default:
      return <QuestionIcon width={80} height={80} />;
  }
};
  return (
    <Modal transparent={true} visible={visible} animationType="fade"  onRequestClose={close}>
      <View style={styles.modalOverlay}>
        
        <Animatable.View
            animation="zoomIn"
            duration={300}
            easing="ease-out"
            style={styles.modalContent}
          >
             <Animatable.View animation="bounceIn" duration={800} delay={150}>
              {renderDialogIcon()}
            </Animatable.View>
          <Text style={styles.modalTitle}>{dialog.title}</Text>
          <Text style={styles.modalMessage}>{dialog.message}</Text>
          <View style={[styles.modalButtons,]}>
            {dialog.buttons.map((btn, index) => (
              <Pressable
                android_ripple={{ color: '#4B008230', borderless: false }}
                key={index}
                style={({ pressed }) =>[
                  styles.positiveButton,
                  btn.style === 'destructive' && styles.cancelButton,
                  dialog.buttons.length === 1 ? {marginRight:0} : {marginLeft:10, marginRight: 10},
                  pressed && { opacity: 0.85 }, 
                ]}
                onPress={() => {
                  close();
                  btn.onPress?.();
                }}
              >
                <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.btnText,btn.style === 'destructive' && styles.btnText2,]}>{btn.text}</Text>
              </Pressable>
            ))}
          </View>
        </Animatable.View>
      </View>
    </Modal>
  );
};

export default CustomDialogComponent;



const styles = StyleSheet.create({
modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContent: {
    width: '88%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    minHeight:"33%"
  },
  modalTitle: {
    fontFamily:Fonts.Regular,
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
    marginBottom: 3,
    alignSelf:'center',
    marginTop:'5%',
  },
  modalMessage: {
     fontFamily:Fonts.Regular,
    fontSize: 12,
    color: '#747474',
    textAlign: 'center',
    marginBottom: 20,
    alignSelf:'center'
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: '14%',
  },
  positiveButton: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginRight: 20,
    alignItems: 'center',
  },
  btnText: {
    fontFamily:Fonts.Regular,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize:14
  },
    btnText2: {
    fontFamily:Fonts.Regular,
    color: colors.primaryColor,
    fontWeight: '600',
    fontSize:14
  },
  cancelButton: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth:1,
    borderColor:colors.primaryColor,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  cancelText: {
    fontFamily:Fonts.Regular,
    color: colors.primaryColor,
    fontWeight: '600',
    fontSize:14

  },

});
