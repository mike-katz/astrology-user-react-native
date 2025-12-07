import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = ({width=14, height=10,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 14 10"
  >
    <Path
      fill="#000"
      d="M13.591.399c.262.256.409.602.409.964 0 .361-.147.708-.409.964L6.143 9.6a1.414 1.414 0 0 1-.987.399c-.37 0-.725-.143-.987-.399L.445 5.964A1.365 1.365 0 0 1 0 4.99a1.336 1.336 0 0 1 .41-.988 1.4 1.4 0 0 1 1.011-.4 1.425 1.425 0 0 1 .997.434L5.156 6.71 11.618.399c.261-.256.617-.399.987-.399s.725.143.986.399Z"
    />
  </Svg>
)
export default SvgComponent
