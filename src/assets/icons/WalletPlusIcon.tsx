import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=16, height=16,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 16 16"
  >
    <Path
      fill="#000"
      d="M7.917 0a7.973 7.973 0 0 0-5.57 2.372A8.141 8.141 0 0 0 0 8a8.141 8.141 0 0 0 2.347 5.629A7.973 7.973 0 0 0 7.917 16a7.973 7.973 0 0 0 5.57-2.371A8.141 8.141 0 0 0 15.834 8a8.141 8.141 0 0 0-2.347-5.628A7.974 7.974 0 0 0 7.917 0Zm4.524 8.571H8.482v4h-1.13v-4h-3.96V7.43h3.96v-4h1.13v4h3.959V8.57Z"
    />
  </Svg>
)
export default SvgComponent
