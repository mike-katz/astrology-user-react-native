import { Animated, Platform, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { colors } from "../styles";
import { CustomDialogManager2 } from "../utils/CustomDialog2";
import { openSettings, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { useEffect, useRef, useState } from "react";

 export const StarRating = ({size, rating }:any) => {
    return (
      <View style={{ flexDirection: "row" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Feather
            key={star}
            name="star"
            size={size}
            color={star <= rating ? colors.primaryColor : "#CCCCCC"} 
            style={{ marginRight: 3 }}
          />
        ))}
      </View>
    );
  };

    export const requestCameraPermission = async () => {
        const permission = Platform.select({
            ios: PERMISSIONS.IOS.CAMERA,
            android: PERMISSIONS.ANDROID.CAMERA,
        });

        const result = await request(permission!);
        if (result === RESULTS.GRANTED) return true;

        CustomDialogManager2.show({
            title: 'Permission Denied',
            message: 'Camera access is required.',
            type:2,
            buttons: [
            {
                text: 'Ok',
                onPress: () => {
                
                },
                style: 'default',
            },
            ],
        });
        return false;
    };
  
    export const openAppSettings = () => {
  openSettings().catch(() => {
    console.log("Cannot open settings");
  });
};

    export const requestGalleryPermission = async () => {
      const androidVersion = Number(Platform.Version);
        const permission = Platform.select({
            ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
            android: androidVersion >= 33
                ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
                : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        });

        const result = await request(permission!);
        if (result === RESULTS.GRANTED) return true;


          if (result === RESULTS.BLOCKED) {
              CustomDialogManager2.show({
                title: "Permission Required",
                message: "Gallery access is blocked. Please enable it from Settings.",
                type: 2,
                buttons: [
                  {
                    text: "Open Settings",
                    onPress: () => openSettings(),
                    style: "default",
                  },
                ],
              });
              return false;
            }

               CustomDialogManager2.show({
                    title: 'Permission Denied',
                    message: 'Gallery access is required.',
                    type:2,
                    buttons: [
                    {
                        text: 'Ok',
                        onPress: () => {
                        
                        },
                        style: 'default',
                    },
                    ],
                });
        return false;
    };

export const socketSendMessage = (event:any, data:any) => {
  return JSON.stringify({
    event: event,
    data: data
  });
};

export function ms(m: number) {
  const s = Math.max(0, Math.floor(m / 1000));
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

const formatTime = (ms: number) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const useCountdown = (
  endTime?: string | number,
  onFinish?: () => void
) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const finishedRef = useRef(false); // 👈 guard

  useEffect(() => {
    if (!endTime) return;

    finishedRef.current = false; // reset on new endTime

    const endMillis =
      typeof endTime === "number"
        ? endTime * 1000
        : new Date(endTime).getTime();

    if (isNaN(endMillis)) return;

    const timer = setInterval(() => {
      const diff = Math.floor((endMillis - Date.now()) / 1000);

      if (diff <= 0) {
        if (!finishedRef.current) {
          finishedRef.current = true;
          setSecondsLeft(0);
          onFinish?.(); // ✅ ONLY ONCE
        }
        clearInterval(timer); // 🔥 STOP LOOP
        return;
      }

      setSecondsLeft(diff);
    }, 1000);

    // run immediately
    const initialDiff = Math.floor((endMillis - Date.now()) / 1000);
    setSecondsLeft(Math.max(0, initialDiff));

    return () => clearInterval(timer);
  }, [endTime]);

  // format mm:ss
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  // return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return {
    remainingSeconds: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
    secondsLeft,
  };
};





export const to12Hour = (iso: string) => {
  return new Date(iso).toLocaleString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const getStatusStyle = (status?: string) => {
  switch (status) {
     case 'completed':
      return { color: '#2DBE60' }; // green
    case 'continue':
      return { color: '#2DBE60' }; // green
    case 'pending':
      return { color: '#FF9800' }; // orange
    case 'cancel':
      return { color: '#D23B3B' }; // red
    default:
      return { color: '#777' };    // fallback
  }
};

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
