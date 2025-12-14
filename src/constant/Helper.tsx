import { Platform, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { colors } from "../styles";
import { CustomDialogManager2 } from "../utils/CustomDialog2";
import { openSettings, PERMISSIONS, request, RESULTS } from "react-native-permissions";

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