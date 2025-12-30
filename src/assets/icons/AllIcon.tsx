import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { colors } from "../../styles"
const SvgComponent = ({width=12, height=12,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 12 12"
  >
    <Path
      fill={colors.primaryColor}
      d="M0 5.4V0h5.4v5.4H0Zm0 1.2h5.4V12H0V6.6ZM6.6 0v5.4H12V0H6.6Zm0 12V6.6H12V12H6.6Z"
    />
  </Svg>
)
export default SvgComponent
