import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=14,height=14,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 14 14"
  >
    <Path
      fill="#000"
      d="M6 8H1a.965.965 0 0 1-.712-.288A.972.972 0 0 1 0 7c0-.283.095-.52.288-.712A.97.97 0 0 1 1 6h5V1c0-.283.096-.52.288-.712A.972.972 0 0 1 7 0c.283 0 .52.095.713.288A.96.96 0 0 1 8 1v5h5c.283 0 .521.096.713.288.192.192.288.43.287.712 0 .283-.097.52-.288.713A.957.957 0 0 1 13 8H8v5a.968.968 0 0 1-.288.713A.964.964 0 0 1 7 14a.973.973 0 0 1-.712-.288A.965.965 0 0 1 6 13V8Z"
    />
  </Svg>
)
export default SvgComponent
