import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=9, height=6,...props}) => (
  <Svg
     width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 9 6"
  >
    <Path
      fill="#000"
      d="M.5 6a.483.483 0 0 1-.356-.144A.486.486 0 0 1 0 5.5c0-.141.048-.26.144-.356A.485.485 0 0 1 .5 5h8c.142 0 .26.048.357.144A.482.482 0 0 1 9 5.5a.488.488 0 0 1-.5.5h-8Zm0-2.5a.483.483 0 0 1-.356-.144A.486.486 0 0 1 0 3c0-.141.048-.26.144-.356A.485.485 0 0 1 .5 2.5h8c.142 0 .26.048.357.144A.482.482 0 0 1 9 3a.488.488 0 0 1-.5.5h-8ZM.5 1A.483.483 0 0 1 .144.856.486.486 0 0 1 0 .5C0 .359.048.24.144.144A.485.485 0 0 1 .5 0h8c.142 0 .26.048.357.144A.482.482 0 0 1 9 .5a.488.488 0 0 1-.5.5h-8Z"
    />
  </Svg>
)
export default SvgComponent
