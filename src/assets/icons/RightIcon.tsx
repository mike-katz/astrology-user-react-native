import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=9, height=17,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 9 17"
  >
    <Path
      fill="#7A7A7A"
      fillRule="evenodd"
      d="M6.71 8.5 0 15.584 1.342 17l7.38-7.792A1.03 1.03 0 0 0 9 8.5c0-.266-.1-.52-.278-.708L1.342 0 0 1.417 6.71 8.5Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
