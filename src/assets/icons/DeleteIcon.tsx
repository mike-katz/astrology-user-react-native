import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=20,height=23,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 20 23"
  >
    <Path
      fill="#E8261F"
      d="M3.75 22.5a2.407 2.407 0 0 1-1.765-.734A2.412 2.412 0 0 1 1.25 20V3.75H0v-2.5h6.25V0h7.5v1.25H20v2.5h-1.25V20a2.41 2.41 0 0 1-.734 1.766c-.489.49-1.078.735-1.766.734H3.75Zm12.5-18.75H3.75V20h12.5V3.75Zm-10 13.75h2.5V6.25h-2.5V17.5Zm5 0h2.5V6.25h-2.5V17.5Z"
    />
  </Svg>
)
export default SvgComponent
