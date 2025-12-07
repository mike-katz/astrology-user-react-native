import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
import { colors } from "../../styles"
const SvgComponent = ({width=108,height=108,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 108 108"
  >
    <Circle cx={54} cy={54} r={54} fill="#F6F3F9" />
    <Path stroke={colors.primaryColor} strokeWidth={2} d="M31 55.603 44.929 69.5 76 38.5" />
  </Svg>
)
export default SvgComponent
