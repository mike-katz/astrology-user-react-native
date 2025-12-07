import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=33, height=33,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 33 33"
  >
    <Path
      stroke="#000"
      d="M11.459 1.707a.802.802 0 0 1 1.076 0l10.904 9.945v.001l.008.008a.142.142 0 0 1 .05.077.165.165 0 0 1-.009.092.169.169 0 0 1-.055.076.14.14 0 0 1-.088.027h-2.717v9.746c0 .456-.37.82-.805.821H15.91a.817.817 0 0 1-.805-.821v-7.105H8.89v7.105c0 .456-.37.821-.805.821H4.171a.817.817 0 0 1-.804-.821v-9.746H.65a.132.132 0 0 1-.084-.026.162.162 0 0 1-.053-.074.156.156 0 0 1 .009-.14l.03-.037.005-.004 10.903-9.945Z"
    />
  </Svg>
)
export default SvgComponent
