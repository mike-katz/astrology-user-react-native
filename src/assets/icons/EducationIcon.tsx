import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=18,height=14,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 18 14"
  >
    <Path
      fill="#FE84BB"
      d="m9.302 8.157 4.76-1.933v4.732c0 1.02-2.264 1.85-5.062 1.85-2.798 0-5.063-.83-5.063-1.85V6.224l4.775 1.933.295.121.295-.121Zm-.295-.853L18 3.652 9.007 0 0 3.652l1.406.57v6.225c-.33.167-.562.54-.562.966V14h1.969v-2.587c0-.434-.233-.806-.57-.974V4.558l6.764 2.746Z"
    />
  </Svg>
)
export default SvgComponent
