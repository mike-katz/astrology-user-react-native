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
      fill="#1AA260"
      d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Z"
    />
    <Path
      fill="#fff"
      d="M19.014 7.788a1.385 1.385 0 0 1 0 1.957l-7.385 7.384a1.385 1.385 0 0 1-1.957 0L5.98 13.437a1.385 1.385 0 1 1 1.957-1.957l2.713 2.714 6.407-6.406a1.385 1.385 0 0 1 1.957 0Z"
    />
  </Svg>
)
export default SvgComponent
