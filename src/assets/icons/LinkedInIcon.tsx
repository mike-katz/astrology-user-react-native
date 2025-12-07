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
      fill="#0A66C2"
      d="M20.45 20.45h-3.556v-5.57c0-1.328-.024-3.038-1.85-3.038-1.852 0-2.136 1.448-2.136 2.94v5.668H9.352V8.996h3.414v1.566h.048a3.75 3.75 0 0 1 3.368-1.85c3.604 0 4.27 2.37 4.27 5.456l-.002 6.28v.002ZM5.34 7.43a2.074 2.074 0 0 1-2.064-2.062c0-1.132.932-2.064 2.064-2.064 1.132 0 2.062.932 2.064 2.064A2.072 2.072 0 0 1 5.34 7.43Zm1.778 13.02h-3.56V8.996h3.56V20.45ZM22.22 0H1.77A1.76 1.76 0 0 0 0 1.732v20.536A1.76 1.76 0 0 0 1.77 24h20.452A1.764 1.764 0 0 0 24 22.268V1.73A1.76 1.76 0 0 0 22.222.002L22.22 0Z"
    />
  </Svg>
)
export default SvgComponent
