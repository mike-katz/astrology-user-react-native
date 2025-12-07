import {Alert, Platform} from 'react-native';
import {
  requestMultiple,
  checkMultiple,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

export const Camera_Action = [
  {
    id: 1,
    label: 'Camera',
  },
  {
    id: 2,
    label: 'Gallery',
  },
];

export async function requestCameraPhotoPermission(callBack: () => any) {
  if (Platform.OS === 'ios') {
    checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]).then(
      statuses => {
        if (
          statuses[PERMISSIONS.IOS.CAMERA] == 'granted' &&
          ['granted', 'limited'].includes(
            statuses[PERMISSIONS.IOS.PHOTO_LIBRARY],
          )
        ) {
          callBack && callBack();
        } else if (
          statuses[PERMISSIONS.IOS.CAMERA] == 'blocked' ||
          statuses[PERMISSIONS.IOS.CAMERA] == 'denied' ||
          statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] == 'blocked' ||
          statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] == 'denied' ||
          statuses[PERMISSIONS.IOS.CAMERA] == 'unavailable' ||
          statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] == 'unavailable'
        ) {
          requestMultiple([
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
          ])
            .then(result => {
              if (
                result[PERMISSIONS.IOS.CAMERA] == 'granted' &&
                ['granted', 'limited'].includes(
                  result[PERMISSIONS.IOS.PHOTO_LIBRARY],
                )
              ) {
                callBack && callBack();
              } else {
                openSettingForCameraAccess();
              }
            })
            .catch(() => {
              openSettingForCameraAccess();
            });
        }
      },
    );
  } else {
    try {
      checkMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]).then(statuses => {
        if (
          statuses[PERMISSIONS.ANDROID.CAMERA] === 'granted' ||
          statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'granted'
        ) {
          callBack && callBack();
        } else {
          requestMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ]).then(statuses => {
            if (
              statuses[PERMISSIONS.ANDROID.CAMERA] === 'granted' ||
              statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'granted'
            ) {
              callBack && callBack();
            } else {
              openSettingForCameraAccess();
            }
          });
        }
      });
    } catch (err) {
      console.warn(err);
    }
  }
}

function openSettingForCameraAccess() {
  const actions = [
    {
      text: 'Cancel',
    },
    {
      text: 'Open Settings',
      onPress: () => {
        openSettings().catch(() => console.warn('cannot open settings'));
      },
    },
  ];
  Alert.alert(
    'Camera Permission',
    'Open setting for camera/Photo Library asscess permission.',
    actions,
  );
}
