import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=24,height=24,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 24 24"
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.75 9h1.875a1.875 1.875 0 0 1 1.875 1.875v9a1.875 1.875 0 0 1-1.875 1.875H6.375A1.875 1.875 0 0 1 4.5 19.875v-9A1.875 1.875 0 0 1 6.375 9H8.25m7.5-3L12 2.25m0 0L8.25 6M12 2.25v12.797"
    />
  </Svg>
)
export default SvgComponent
