import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=22,height=22,...props}) => (
  <Svg
    
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 22 22"
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m18.333 18.333-3.712-3.712m0 0a6.416 6.416 0 1 0-9.074-9.074 6.416 6.416 0 0 0 9.073 9.073Z"
    />
  </Svg>
)
export default SvgComponent
