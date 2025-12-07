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
      fill="#F8312F"
      d="M15.756 3.872c-2.13.381-3.758 2.928-3.758 2.928s-1.635-2.547-3.76-2.928C2.98 2.934.813 7.616 1.69 11.102c1.297 5.147 7.54 9.76 9.625 11.187a1.22 1.22 0 0 0 1.373 0c2.093-1.427 8.335-6.04 9.625-11.187.87-3.486-1.297-8.168-6.557-7.23Z"
    />
  </Svg>
)
export default SvgComponent
