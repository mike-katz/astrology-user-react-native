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
      fill="#000"
      d="M9.388 21.68v-6.605h5.218v6.604c0 .727.587 1.321 1.304 1.321h3.913c.718 0 1.305-.594 1.305-1.32v-9.247h2.217c.6 0 .887-.753.43-1.15L12.871 1.337a1.302 1.302 0 0 0-1.748 0L.22 11.283c-.444.397-.17 1.15.43 1.15h2.218v9.246c0 .727.587 1.321 1.304 1.321h3.913c.717 0 1.304-.594 1.304-1.32Z"
    />
  </Svg>
)
export default SvgComponent
