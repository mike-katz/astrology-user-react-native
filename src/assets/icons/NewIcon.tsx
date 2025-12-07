import * as React from "react"
import Svg, { SvgProps, G, Mask, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = ({width=16,height=16,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 16 16"
  >
    <G clipPath="url(#a)">
      <Mask
        id="b"
        width={16}
        height={16}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <Path fill="#fff" d="M0 0h16v16H0V0Z" />
      </Mask>
      <G mask="url(#b)">
        <Path
          stroke="#60D1E2"
          d="M9 6.5H7V8m0 0h1.6M7 8v1.5h2m-5.5.5V6m2 0v4M4 6c0 .5 1 3.5 1 4m5-4v3.5m0 0v.5m0-.5c0-.925.654-1.844 1.154-1.844.5 0 1.347.919 1.347 1.844m0 0V6m0 3.5v.5M8 1l1.903 1.141 2.21.196.87 2.042 1.674 1.458L14.16 8l.497 2.163-1.674 1.458-.87 2.042-2.21.195L8.002 15l-1.904-1.142-2.21-.195-.87-2.042-1.673-1.458L1.84 8l-.497-2.163 1.673-1.458.87-2.042 2.21-.196L8 1Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
