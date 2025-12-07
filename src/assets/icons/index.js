import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Svg, { Defs, LinearGradient, Stop, G, Circle, Pattern, Image, Rect, Path } from 'react-native-svg';
import { colors } from '../../styles';

export const BackIcon = ({ size = 20, disabled = false, onPress, tintColor }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={{ padding: 12 }}>
      <FastImage source={require('../icons/back.png')} style={{ width: size, height: size }} tintColor={tintColor} resizeMode="contain" />
    </TouchableOpacity>
  );
};

export const CheckBox = ({ active, size = 15, color = colors.lightGreen }) => {
  if (active) {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width={size} height={size}>
        <Path
          data-name="Icon material-check-box"
          d="M17.778 0H2.222A2.222 2.222 0 000 2.222v15.556A2.222 2.222 0 002.222 20h15.556A2.222 2.222 0 0020 17.778V2.222A2.222 2.222 0 0017.778 0zm-10 15.556L2.222 10l1.567-1.567 3.989 3.978 8.433-8.433 1.567 1.578z"
          fill={color}
        />
      </Svg>
    );
  }
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width={size} height={size}>
      <Path
        data-name="Icon material-check-box-outline-blank"
        d="M17.778 2.222v15.556H2.222V2.222h15.556m0-2.222H2.222A2.229 2.229 0 000 2.222v15.556A2.229 2.229 0 002.222 20h15.556A2.229 2.229 0 0020 17.778V2.222A2.229 2.229 0 0017.778 0z"
        fill={color}
      />
    </Svg>
  );
};

export function Search({ size, color }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 19.731 19.731">
      <G data-name="Icon feather-search" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <Path data-name="Path 5" d="M16.392 8.7a7.7 7.7 0 11-7.7-7.7 7.7 7.7 0 017.7 7.7z" />
        <Path data-name="Path 6" d="M18.317 18.317l-4.185-4.185" />
      </G>
    </Svg>
  );
}

export function DropDownIcon({ color, size }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 96.154 96.154">
      <Path
        fill={color}
        d="M.561 20.971l45.951 57.605c.76.951 2.367.951 3.127 0l45.956-57.609c.547-.689.709-1.716.414-2.61a2.686 2.686 0 00-.186-.437 2.004 2.004 0 00-1.765-1.056H2.093c-.736 0-1.414.405-1.762 1.056a2.62 2.62 0 00-.184.426c-.297.905-.136 1.934.414 2.625z"
      />
    </Svg>
  );
}

export const TrashIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={11.85} height={15.434}>
    <Path data-name="Path 3600" d="M10.986 1.944h-9.6v11.44c0 1.233 1 1.708 2.233 1.708h5.137c1.233 0 2.233-.474 2.233-1.708Z" fill="#fff" />
    <Path data-name="Path 3601" d="M4.679 1.64V.425h3.038V1.64" fill="#fff" />
    <Path data-name="Path 3602" d="M10.755 8.021v6.265l-.82.723H5.286Z" fill="#9b9b9a" />
    <Path data-name="Rectangle 470" fill="#fff" d="M.425 1.425h11v2h-11z" />
    <G fill="none" stroke="#6d6d6d" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={0.85}>
      <Path data-name="Path 3603" d="M4.679 1.64V.425h3.038V1.64" />
      <Path data-name="Path 3604" d="M10.755 4.375v9.419a1.215 1.215 0 0 1-1.215 1.215H2.855a1.215 1.215 0 0 1-1.215-1.215V4.375" />
      <Path data-name="Rectangle 471" d="M.425 1.425h11v2h-11z" />
      <Path data-name="Line 17" d="M7.717 5.362v8.128" />
      <Path data-name="Line 18" d="M4.679 5.362v8.128" />
    </G>
  </Svg>
);

export const AddIcon = ({ color = '#fff', size = 88 }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 88 88">
    <G data-name="Icon feather-plus" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
      <Path data-name="Path 122" d="M44.18 29v24.36" />
      <Path data-name="Path 123" d="M32 41.18h24.36" />
    </G>
  </Svg>
);

export const AddPhoto = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={32.017} height={29.233}>
    <Path
      data-name="Icon material-add-a-photo"
      d="M4.176 4.176V0H6.96v4.176h4.176V6.96H6.96v4.176H4.176V6.96H0V4.176Zm4.176 8.352V8.352h4.176V4.176h9.744L24.82 6.96h4.413a2.792 2.792 0 0 1 2.784 2.784v16.7a2.792 2.792 0 0 1-2.784 2.784H6.96a2.792 2.792 0 0 1-2.784-2.784V12.528ZM18.1 25.057a6.96 6.96 0 1 0-6.96-6.96 6.963 6.963 0 0 0 6.96 6.96ZM13.642 18.1a4.455 4.455 0 1 0 4.458-4.458 4.45 4.45 0 0 0-4.458 4.458Z"
      opacity={0.11}
      fill="black"
    />
  </Svg>
);

export const ArrowRight = ({ color = '#7c8e8e' }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={5.718} height={10}>
    <Path
      data-name="Icon ionic-ios-arrow-down"
      d="m5 1.724 3.783 3.784a.712.712 0 0 0 1.009 0 .721.721 0 0 0 0-1.012L5.508.208a.713.713 0 0 0-.985-.021L.208 4.493a.715.715 0 0 0 1.01 1.012Z"
      transform="rotate(90 2.859 2.859)"
      style={{
        fill: color,
      }}
    />
  </Svg>
);
export const ArrowDown = ({ color = '#7c8e8e' }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={10} height={5.718}>
    <Path
      style={{
        fill: color,
      }}
      fill={color}
      d="M5 3.994 1.217.21a.712.712 0 0 0-1.009 0 .721.721 0 0 0 0 1.012L4.492 5.51a.713.713 0 0 0 .985.021l4.315-4.306A.715.715 0 0 0 8.782.213Z"
    />
  </Svg>
);

export const EyeCloseIcon = ({ close = true, size = 20 }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16.417 14.074">
    <G data-name="Icon ionic-ios-eye-off" opacity={0.35}>
      <Path data-name="Path 104" fill="#000" d="M2.062.151a.521.521 0 0 0-.737.737l13.03 13.036a.516.516 0 0 0 .5.132.508.508 0 0 0 .235-.136.52.52 0 0 0 0-.733Z" />
      <G data-name="Group 106">
        <Path
          data-name="Path 105"
          fill="#000"
          d="M8.362 10.335a3.3 3.3 0 0 1-3.134-4.706L3.272 3.666a25.708 25.708 0 0 0-3.124 2.98.579.579 0 0 0 0 .781c2.379 2.628 4.475 4.889 8.052 4.889a7.057 7.057 0 0 0 3.016-.7l-1.594-1.594a3.33 3.33 0 0 1-1.26.313Z"
        />
        <Path
          data-name="Path 106"
          fill="#000"
          d="M16.265 7.404a.575.575 0 0 0 .018-.759C14.366 4.318 11.709 1.76 8.202 1.76a6.861 6.861 0 0 0-3.005.7l1.6 1.6a3.229 3.229 0 0 1 1.257-.315 3.3 3.3 0 0 1 3.134 4.706l1.961 1.961a24.243 24.243 0 0 0 3.116-3.008Z"
        />
        <Path data-name="Path 107" fill="#000" d="M5.871 7.217A2.355 2.355 0 0 0 8.03 9.376a2.291 2.291 0 0 0 .858-.1l-2.925-2.92a2.4 2.4 0 0 0-.092.861Z" />
        <Path data-name="Path 108" fill="#000" d="M10.555 7.038v-.143a1.625 1.625 0 0 1-.667.143h-.114l.682.685a2.343 2.343 0 0 0 .099-.685Z" />
        <Path data-name="Path 109" fill="red" d="M8.209 5.315a1.722 1.722 0 0 1 .114-.619h-.114a2.319 2.319 0 0 0-.678.1l.685.685c-.003-.056-.007-.111-.007-.166Z" />
      </G>
    </G>
  </Svg>
);

export const EyeOpenIcon = ({ size = 20 }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16.417 10.553">
    <G data-name="Icon ionic-ios-eye">
      <Path
        data-name="Path 3913"
        fill="#000"
        d="M8.199 0C5.253 0 2.93 1.854.152 4.884a.579.579 0 0 0 0 .78c2.378 2.627 4.474 4.888 8.05 4.888 3.532 0 6.182-2.847 8.065-4.91a.575.575 0 0 0 .018-.758C14.363 2.558 11.706 0 8.199 0Zm.161 8.571a3.3 3.3 0 1 1 3.14-3.14 3.3 3.3 0 0 1-3.139 3.14Z"
      />
      <Path data-name="Path 3914" fill="#000" d="M8.207 3.554a1.722 1.722 0 0 1 .114-.619h-.114a2.345 2.345 0 1 0 2.345 2.345v-.143a1.625 1.625 0 0 1-.667.143 1.7 1.7 0 0 1-1.678-1.726Z" />
    </G>
  </Svg>
);

export const CalenderIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.5 15.784" width={16.5} height={15.784}>
    <G data-name="Icon feather-calendar" fill="none" stroke="#25484a" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <Path data-name="Path 3611" d="M2.417 2.7h11.666a1.54 1.54 0 0 1 1.667 1.37v9.593a1.54 1.54 0 0 1-1.667 1.37H2.417A1.54 1.54 0 0 1 .75 13.664V4.07A1.54 1.54 0 0 1 2.417 2.7Z" />
      <Path data-name="Path 3612" d="M11.583.75v3.9" />
      <Path data-name="Path 3613" d="M4.917.75v3.9" />
      <Path data-name="Path 3614" d="M.75 6.464h15" />
    </G>
  </Svg>
);

export const CartProductListIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 29 24">
    <G data-name="Group 3378" transform="translate(-287 -172)">
      <Rect data-name="Rectangle 490" width={29} height={24} rx={3} transform="translate(287 172)" />
      <Path
        data-name="Icon awesome-cart-plus"
        d="M309 185.781h-9.872l.221 1.078h9.043a.809.809 0 0 1 .788.988l-.186.818a1.887 1.887 0 1 1-2.143.351h-7.062a1.887 1.887 0 1 1-2.259-.289l-2.367-11.571h-2.354a.809.809 0 0 1-.809-.808v-.539a.809.809 0 0 1 .809-.809h3.454a.809.809 0 0 1 .792.647l.309 1.51H310.6a.809.809 0 0 1 .788.988l-1.593 7.008a.809.809 0 0 1-.795.628Zm-3.254-5.121h-1.617v-1.348a.539.539 0 0 0-.539-.539h-.539a.539.539 0 0 0-.539.539v1.348h-1.618a.539.539 0 0 0-.539.539v.539a.539.539 0 0 0 .539.539h1.617v1.348a.539.539 0 0 0 .539.539h.539a.539.539 0 0 0 .539-.539v-1.348h1.617a.539.539 0 0 0 .539-.539v-.538a.539.539 0 0 0-.538-.54Z"
        fill="#fff"
      />
    </G>
  </Svg>
);

export const ProductCompareIcon = ({ color = '#fff' }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 18.828">
    <Path d="M11 4.414H1v10h6v-9m4-3v4l2-2Zm0 12 2 2v-4Zm2 0h10v-10h-6v9" fill="none" stroke={color} strokeWidth={2} />
  </Svg>
);

export const EditIcon = ({ size = 20 }) => {
  return <FastImage source={require('../icons/pencil.png')} style={{ width: size, height: size }} resizeMode="contain" />;
};

export const ArrowIconForAdd = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={60.009} height={107.49}>
    <Defs>
      <LinearGradient id="a" y1={0.5} x2={1} y2={0.5} gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#25484a" />
        <Stop offset={1} stopColor="#266746" />
      </LinearGradient>
    </Defs>
    <G data-name="Group 3569">
      <Path data-name="Icon ionic-md-arrow-dropdown" d="m9 13.5 9 9 9-9Z" transform="rotate(56 -58.956 53.647)" fill="url(#a)" />
      <Path data-name="Path 3620" d="M19.427 94.894C93.503 53.16 14.937.963 14.937.963" fill="none" stroke="#7aad37" strokeWidth={2} strokeDasharray="4 3" />
    </G>
  </Svg>
);

export const FootPrintArrow = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={73} height={122}>
    <Defs>
      <Pattern id="a" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 215 357">
        <Image
          width={215}
          height={357}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANcAAAFlCAYAAAB4CH1/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmVkYTJiM2ZhYywgMjAyMS8xMS8xNy0xNzoyMzoxOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjEgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE1QTBDNEFBN0NFMjExRUM4OEQ3REVFRDBBNzc1MTJDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE1QTBDNEFCN0NFMjExRUM4OEQ3REVFRDBBNzc1MTJDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTVBMEM0QTg3Q0UyMTFFQzg4RDdERUVEMEE3NzUxMkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTVBMEM0QTk3Q0UyMTFFQzg4RDdERUVEMEE3NzUxMkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6AU6VxAABz70lEQVR42uxd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"
        />
      </Pattern>
    </Defs>
    <Path fill="url(#a)" d="M0 0h73v122H0z" />
  </Svg>
);

export const CartIcons = ({ size = 22 }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 22.5 20">
      <Path
        data-name="Icon awesome-shopping-cart"
        d="m20.63 11.77 1.847-8.125a.938.938 0 0 0-.915-1.145H6.219L5.861.75A.937.937 0 0 0 4.943 0H.937A.937.937 0 0 0 0 .937v.625a.937.937 0 0 0 .937.938h2.73l2.744 13.415a2.188 2.188 0 1 0 2.619.335h8.19a2.187 2.187 0 1 0 2.484-.406l.216-.948a.938.938 0 0 0-.914-1.145H8.52L8.265 12.5h11.451a.937.937 0 0 0 .914-.73Z"
        fill="#fff"
      />
    </Svg>
  );
};

export const CloseIcon = ({ size, color = '#000' }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={size} height={size}>
    <Path fill={color} d="M9.156 6.313 6.312 9.155 22.157 25 6.22 40.969 9.03 43.78 25 27.844 40.938 43.78l2.843-2.843L27.844 25 43.687 9.156l-2.843-2.844L25 22.157Z" />
  </Svg>
);

export const PlusIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={11.058} height={11.058}>
    <G data-name="Icon feather-plus" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}>
      <Path data-name="Path 3902" d="M5.529.9v9.258" />
      <Path data-name="Path 3903" d="M.9 5.529h9.258" />
    </G>
  </Svg>
);

export const MinusIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={11.058} height={1.8}>
    <G data-name="Icon feather-plus" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}>
      <Path data-name="Path 3902" d="M5.529.9h0" />
      <Path data-name="Path 3903" d="M.9.9h9.258" />
    </G>
  </Svg>
);

export function CheckedIcon({ size, color, isChecked }) {
  if (isChecked) {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <G data-name="Icon ionic-ios-checkmark-circle-outline" fill={color}>
          <Path
            data-name="Path 3569"
            d="M18.244 8.404l-1.021-1.05a.219.219 0 00-.162-.07.211.211 0 00-.162.07l-7.075 7.124-2.575-2.575a.224.224 0 00-.325 0l-1.036 1.036a.231.231 0 000 .331l3.248 3.248a1.027 1.027 0 00.679.331 1.076 1.076 0 00.673-.319h.006l7.754-7.794a.248.248 0 00-.004-.332z"
          />
          <Path data-name="Path 3570" d="M12.062 1.625A10.435 10.435 0 114.68 4.68a10.37 10.37 0 017.382-3.055m0-1.624a12.063 12.063 0 1012.063 12.061A12.061 12.061 0 0012.062 0z" />
        </G>
      </Svg>
    );
  }
  return (
    <View
      style={{
        width: size,
        height: size,
        borderWidth: 0.6,
        borderRadius: 20,
        borderColor: '#BEC2C9',
      }}
    />
  );
}

export const SettingsIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24.006}>
    <Path
      data-name="Icon ionic-ios-settings"
      d="M22.019 12A3.088 3.088 0 0 1 24 9.119a12.242 12.242 0 0 0-1.481-3.569 3.13 3.13 0 0 1-1.256.269 3.081 3.081 0 0 1-2.819-4.338A12.2 12.2 0 0 0 14.881 0a3.086 3.086 0 0 1-5.762 0A12.242 12.242 0 0 0 5.55 1.481a3.081 3.081 0 0 1-2.819 4.338 3.028 3.028 0 0 1-1.256-.269A12.512 12.512 0 0 0 0 9.125a3.087 3.087 0 0 1 .006 5.762 12.242 12.242 0 0 0 1.481 3.569 3.083 3.083 0 0 1 4.069 4.069 12.313 12.313 0 0 0 3.569 1.481 3.08 3.08 0 0 1 5.75 0 12.242 12.242 0 0 0 3.569-1.481 3.086 3.086 0 0 1 4.069-4.069 12.313 12.313 0 0 0 1.481-3.569A3.1 3.1 0 0 1 22.019 12Zm-9.962 4.994a5 5 0 1 1 5-5 5 5 0 0 1-5.001 5Z"
      fill="#255c45"
    />
  </Svg>
);

export const ChangePasswordIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={25} height={28.571}>
    <Path
      data-name="Icon awesome-lock"
      d="M22.321 12.5h-1.339V8.482a8.482 8.482 0 1 0-16.964 0V12.5H2.679A2.679 2.679 0 0 0 0 15.179v10.714a2.679 2.679 0 0 0 2.679 2.679h19.642A2.679 2.679 0 0 0 25 25.893V15.179a2.679 2.679 0 0 0-2.679-2.679Zm-5.8 0H8.482V8.482a4.018 4.018 0 1 1 8.036 0Z"
      fill="#266546"
    />
  </Svg>
);

export const CountryIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={26} height={26.005}>
    <Path
      data-name="Icon awesome-globe"
      d="M17.643 7.969C16.882 3.287 15.089 0 13 0S9.123 3.287 8.363 7.969Zm-9.674 5.033a32.863 32.863 0 0 0 .173 3.356h9.715a32.862 32.862 0 0 0 .173-3.356 32.862 32.862 0 0 0-.173-3.356H8.142a32.863 32.863 0 0 0-.173 3.356Zm17.024-5.033A13.03 13.03 0 0 0 16.709.545a17.7 17.7 0 0 1 2.621 7.424ZM9.291.545a13.021 13.021 0 0 0-8.279 7.424h5.662A17.624 17.624 0 0 1 9.291.545Zm16.264 9.1h-6.014c.11 1.1.173 2.228.173 3.356s-.063 2.254-.173 3.356h6.008A12.89 12.89 0 0 0 26 13.002a13.116 13.116 0 0 0-.446-3.355ZM6.292 13.002c0-1.127.063-2.254.173-3.356H.451a12.711 12.711 0 0 0 0 6.711h6.008a35.768 35.768 0 0 1-.167-3.355Zm2.071 5.035c.76 4.682 2.553 7.969 4.64 7.969s3.88-3.287 4.64-7.969Zm8.352 7.424A13.043 13.043 0 0 0 25 18.037h-5.664a17.7 17.7 0 0 1-2.621 7.422ZM1.012 18.037A13.03 13.03 0 0 0 9.3 25.459a17.7 17.7 0 0 1-2.626-7.422H1.012Z"
      fill="#266546"
    />
  </Svg>
);

export function RadioCheckBox({ size, color, isChecked }) {
  if (isChecked) {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <G data-name="Icon ionic-ios-checkmark-circle-outline" fill={color}>
          <Path
            data-name="Path 3569"
            d="M18.244 8.404l-1.021-1.05a.219.219 0 00-.162-.07.211.211 0 00-.162.07l-7.075 7.124-2.575-2.575a.224.224 0 00-.325 0l-1.036 1.036a.231.231 0 000 .331l3.248 3.248a1.027 1.027 0 00.679.331 1.076 1.076 0 00.673-.319h.006l7.754-7.794a.248.248 0 00-.004-.332z"
          />
          <Path data-name="Path 3570" d="M12.062 1.625A10.435 10.435 0 114.68 4.68a10.37 10.37 0 017.382-3.055m0-1.624a12.063 12.063 0 1012.063 12.061A12.061 12.061 0 0012.062 0z" />
        </G>
      </Svg>
    );
  }
  return (
    <View
      style={{
        width: size,
        height: size,
        borderWidth: 0.6,
        borderRadius: 20,
        borderColor: '#BEC2C9',
      }}
    />
  );
}

export const PhoneIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={15}>
    <Path
      data-name="Icon awesome-phone-alt"
      d="m14.572 10.6-3.281-1.406a.7.7 0 0 0-.82.2l-1.454 1.777A10.859 10.859 0 0 1 3.826 5.98L5.6 4.527a.7.7 0 0 0 .2-.82L4.4.425a.708.708 0 0 0-.808-.407L.545.721A.7.7 0 0 0 0 1.407 13.592 13.592 0 0 0 13.594 15a.7.7 0 0 0 .686-.545l.7-3.047a.712.712 0 0 0-.41-.809Z"
      fill="#276d47"
    />
  </Svg>
);

export const EditPanIcon = ({ size, color = '#266546' }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 11.8 11.8">
    <Path
      data-name="Icon material-edit"
      d="M0 9.342v2.462h2.458l7.249-7.249-2.458-2.462ZM11.608 2.65a.653.653 0 0 0 0-.924L10.074.192a.653.653 0 0 0-.924 0l-1.2 1.2 2.458 2.458 1.2-1.2Z"
      fill={color}
    />
  </Svg>
);

export const OrderHistory = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={27.65} height={23.7}>
      <Path
        data-name="Icon material-history"
        d="M15.8 0A11.851 11.851 0 0 0 3.95 11.85H0l5.122 5.122.092.184 5.319-5.306h-3.95a9.261 9.261 0 1 1 2.712 6.5l-1.87 1.87A11.847 11.847 0 1 0 15.8 0Zm-1.317 6.583v6.583l5.635 3.344.948-1.593-4.608-2.739v-5.6Z"
        fill="#266546"
      />
    </Svg>
  );
};

export const CopyClipboardIcon = ({ size, color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 115.77 122.88"
    width={size}
    height={size}
    style={{
      enableBackground: 'new 0 0 115.77 122.88',
    }}
    xmlSpace="preserve">
    <Path
      d="M89.62 13.96v7.73h12.2v.02c3.85.01 7.34 1.57 9.86 4.1 2.5 2.51 4.06 5.98 4.07 9.82h.02v73.3h-.02c-.01 3.84-1.57 7.33-4.1 9.86-2.51 2.5-5.98 4.06-9.82 4.07v.02H40.1v-.02c-3.84-.01-7.34-1.57-9.86-4.1-2.5-2.51-4.06-5.98-4.07-9.82h-.02V92.51h-12.2v-.02c-3.84-.01-7.34-1.57-9.86-4.1-2.5-2.51-4.06-5.98-4.07-9.82H0V13.95h.02c.01-3.85 1.58-7.34 4.1-9.86C6.63 1.59 10.1.03 13.94.02V0H75.67v.02c3.85.01 7.34 1.57 9.86 4.1 2.5 2.51 4.06 5.98 4.07 9.82h.02v.02zm-10.58 7.73v-7.75h.02c0-.91-.39-1.75-1.01-2.37-.61-.61-1.46-1-2.37-1v.02H13.95v-.02c-.91 0-1.75.39-2.37 1.01-.61.61-1 1.46-1 2.37h.02v64.62h-.02c0 .91.39 1.75 1.01 2.37.61.61 1.46 1 2.37 1v-.02h12.2V35.64h.02c.01-3.85 1.58-7.34 4.1-9.86 2.51-2.5 5.98-4.06 9.82-4.07v-.02H79.04zm26.14 87.23V35.63h.02c0-.91-.39-1.75-1.01-2.37-.61-.61-1.46-1-2.37-1v.02H40.09v-.02c-.91 0-1.75.39-2.37 1.01-.61.61-1 1.46-1 2.37h.02v73.3h-.02c0 .91.39 1.75 1.01 2.37.61.61 1.46 1 2.37 1v-.02H101.83v.02c.91 0 1.75-.39 2.37-1.01.61-.61 1-1.46 1-2.37h-.02v-.01z"
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      }}
      fill={color}
    />
  </Svg>
);

export const WarningIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 554.2 554.199"
      style={{
        enableBackground: 'new 0 0 554.2 554.199',
      }}
      xmlSpace="preserve">
      <Path
        d="M538.5 386.199 356.5 70.8a91.803 91.803 0 0 0-79.501-45.9c-32.8 0-63.1 17.5-79.5 45.9L12.3 391.6a91.793 91.793 0 0 0 0 91.8c16.4 28.4 46.7 45.9 79.5 45.9H462.4c50.7 0 91.8-41.101 91.8-91.8 0-19-5.8-36.7-15.7-51.301zm-222.2 30.7c0 21.7-16.7 38.3-39.2 38.3s-39.2-16.6-39.2-38.3V416c0-21.601 16.7-38.301 39.2-38.301S316.3 394.3 316.3 416v.899zm.9-258.199-19.4 169.4c-1.3 12.2-9.4 19.8-20.7 19.8s-19.4-7.7-20.7-19.8L237 158.6c-1.3-13.1 5.801-23 18-23h44.1c12.2.1 19.4 10 18.1 23.1z"
        fill={'#D20000'}
      />
    </Svg>
  );
};
