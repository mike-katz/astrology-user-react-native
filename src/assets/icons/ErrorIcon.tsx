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
    <Circle cx={54} cy={54} r={54} fill={colors.primaryColor} />
    <Path
      fill="#fff"
      d="m55.94 37.91-.185 20.752h-2.5l-.184-20.753h2.869Zm-1.435 29.303a2.003 2.003 0 0 1-1.449-.596 2.003 2.003 0 0 1-.596-1.45c0-.568.199-1.05.596-1.448.408-.398.89-.597 1.45-.597.558 0 1.036.199 1.434.597.407.398.61.88.61 1.449 0 .369-.094.71-.283 1.022-.18.313-.426.564-.739.753-.303.18-.644.27-1.023.27Z"
    />
  </Svg>
)
export default SvgComponent
