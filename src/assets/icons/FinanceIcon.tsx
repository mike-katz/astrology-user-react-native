import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=20, height=15,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 20 15"
  >
    <Path
      fill="#6BBBB0"
      d="M18.333 2.5a.833.833 0 0 0-.833-.833h-15a.833.833 0 0 0-.833.833v10c0 .46.373.833.833.833h15c.46 0 .833-.373.833-.833v-10ZM20 12.5a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 0 12.5v-10A2.5 2.5 0 0 1 2.5 0h15A2.5 2.5 0 0 1 20 2.5v10Z"
    />
    <Path
      fill="#6BBBB0"
      d="M5.833 10a.833.833 0 1 1 0 1.666H4.167a.833.833 0 1 1 0-1.667h1.666Zm6.667 0a.833.833 0 0 1 0 1.666H8.333a.833.833 0 0 1 0-1.667H12.5Zm6.667-5.834a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h18.334Z"
    />
  </Svg>
)
export default SvgComponent
