import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=24, height=24,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 24 24"
  >
    <Path
      fill="#E8212C"
      d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Z"
    />
    <Path
      fill="#fff"
      d="M9.486 7.745a1.23 1.23 0 0 0-1.74 1.74l2.821 2.823-2.822 2.822a1.23 1.23 0 1 0 1.74 1.74l2.823-2.822 2.822 2.822a1.23 1.23 0 0 0 1.74-1.74l-2.822-2.822 2.822-2.822a1.23 1.23 0 0 0-1.74-1.74l-2.822 2.821-2.822-2.822Z"
    />
  </Svg>
)
export default SvgComponent
