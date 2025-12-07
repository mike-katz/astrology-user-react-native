import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=12, height=12,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 12 12"
  >
    <Path
      fill="#000"
      d="M7.859 6.38 6.6 5.654V3a.6.6 0 1 0-1.2 0v3a.6.6 0 0 0 .3.52l1.559.9a.6.6 0 1 0 .6-1.04ZM6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm0 10.8a4.8 4.8 0 1 1 0-9.6 4.8 4.8 0 0 1 0 9.6Z"
    />
  </Svg>
)
export default SvgComponent
