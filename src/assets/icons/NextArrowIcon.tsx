import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
const SvgComponent = ({width=26, height=26,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 26 26"
  >
    <Circle cx={13} cy={13} r={13} fill="#000" />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="m15.349 13.433-5.815 6.14 1.163 1.227 6.396-6.753a.893.893 0 0 0 .241-.614.893.893 0 0 0-.24-.614l-6.397-6.753-1.163 1.228 5.815 6.14Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
