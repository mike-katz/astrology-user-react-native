import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=20, height=20,color="#939192",...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 20 20"
  >
    <Path
      fill="#7A7A7A"
      d="M10.625 13.75v-5h-2.5V10h1.25v3.75H7.5V15h5v-1.25h-1.875ZM10 5a.937.937 0 1 0 0 1.875A.937.937 0 0 0 10 5Z"
    />
    <Path
      fill="#7A7A7A"
      d="M10 18.75a8.75 8.75 0 1 1 0-17.5 8.75 8.75 0 0 1 0 17.5ZM10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Z"
    />
  </Svg>
)
export default SvgComponent
