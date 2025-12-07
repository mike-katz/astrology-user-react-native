import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=30, height=30,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 30 30"
  >
    <Path
      stroke="#7A7A7A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 26.25V15m0-6.25H9.936c-3.463 0-3.675-5 0-5 3.937 0 5.062 5 5.062 5Zm0 0h5.062c3.62 0 3.62-5 0-5-3.938 0-5.063 5-5.063 5Z"
    />
    <Path
      stroke="#7A7A7A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M25 15v8.75a2.5 2.5 0 0 1-2.5 2.5h-15a2.5 2.5 0 0 1-2.5-2.5V15m21.25 0v-3.75a2.5 2.5 0 0 0-2.5-2.5H6.25a2.5 2.5 0 0 0-2.5 2.5V15h22.5Z"
    />
  </Svg>
)
export default SvgComponent
