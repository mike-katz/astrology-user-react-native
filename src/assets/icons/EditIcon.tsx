import * as React from "react"
import Svg, {
  SvgProps,
  Circle,
  G,
  Path,
  Defs,
  ClipPath,
} from "react-native-svg"
const SvgComponent = ({width=30,height=30,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 30 30"
  >
    <Circle cx={15} cy={15} r={15} fill="#E9E9E9" />
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        d="m20.781 8.841.378.378a.747.747 0 0 1 0 1.06l-.909.912-1.44-1.44.909-.91a.747.747 0 0 1 1.06 0h.002Zm-7.225 6.166 4.194-4.197 1.44 1.44-4.196 4.194a.748.748 0 0 1-.325.19l-1.828.523.522-1.829a.748.748 0 0 1 .19-.324l.003.003Zm5.103-7.225-6.165 6.162a2.232 2.232 0 0 0-.572.972l-.894 3.125a.75.75 0 0 0 .928.928l3.125-.894c.369-.106.703-.303.972-.572l6.166-6.162a2.25 2.25 0 0 0 0-3.181l-.378-.378a2.25 2.25 0 0 0-3.182 0ZM9.75 9A2.75 2.75 0 0 0 7 11.75v8.5A2.75 2.75 0 0 0 9.75 23h8.5A2.75 2.75 0 0 0 21 20.25v-3.5a.748.748 0 0 0-.75-.75.748.748 0 0 0-.75.75v3.5c0 .691-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.559-1.25-1.25v-8.5c0-.69.56-1.25 1.25-1.25h3.5c.416 0 .75-.334.75-.75a.748.748 0 0 0-.75-.75h-3.5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M7 7h16v16H7z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
