import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=10, height=10,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 10 10"
  >
    <Path
      fill="#000"
      d="M8.5 1h-1V.5a.5.5 0 0 0-1 0V1h-3V.5a.5.5 0 0 0-1 0V1h-1A1.5 1.5 0 0 0 0 2.5v6A1.5 1.5 0 0 0 1.5 10h7A1.5 1.5 0 0 0 10 8.5v-6A1.5 1.5 0 0 0 8.5 1ZM9 8.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5V5h8v3.5ZM9 4H1V2.5a.5.5 0 0 1 .5-.5h1v.5a.5.5 0 1 0 1 0V2h3v.5a.5.5 0 1 0 1 0V2h1a.5.5 0 0 1 .5.5V4Z"
    />
  </Svg>
)
export default SvgComponent
