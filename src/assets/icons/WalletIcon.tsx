import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=17, height=17,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 17 17"
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.035 3.688 11.5.5l1.825 3.196-7.289-.008Z"
    />
    <Path
      stroke="#000"
      strokeLinejoin="round"
      d="M.5 4.5c0-.213.083-.416.232-.566a.788.788 0 0 1 .56-.235h14.25c.21 0 .411.085.56.235.148.15.232.353.232.565v11.2a.804.804 0 0 1-.232.566.788.788 0 0 1-.56.234H1.292a.788.788 0 0 1-.56-.234.804.804 0 0 1-.232-.566V4.5Z"
    />
    <Path
      stroke="#000"
      strokeLinejoin="round"
      d="M12.87 12.1h3.463v-4h-3.464c-1.148 0-2.078.895-2.078 2 0 1.104.93 2 2.078 2Z"
    />
    <Path stroke="#000" strokeLinecap="round" d="M16.334 5.5v9.6" />
  </Svg>
)
export default SvgComponent
