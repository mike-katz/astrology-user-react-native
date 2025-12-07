import * as React from "react"
import Svg, {
  SvgProps,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"
const SvgComponent = ({width=24, height=24,...props}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 24 24"
  >
    <Rect width={24} height={24} fill="url(#a)" rx={2} />
    <Path
      fill="#fff"
      d="M12 16.8c-.378 0-3.713-.008-4.665-.27a2.073 2.073 0 0 1-.933-.554 2.156 2.156 0 0 1-.54-.96C5.602 14.023 5.6 12.082 5.6 12c0-.082.003-2.022.262-3.016.095-.363.281-.694.54-.96.259-.265.58-.456.934-.554.951-.262 4.286-.27 4.664-.27.377 0 3.712.008 4.664.27.353.097.675.289.934.554.258.266.444.596.54.959.259.995.262 2.935.262 3.017 0 .082-.003 2.022-.263 3.017a2.157 2.157 0 0 1-.54.959c-.258.266-.58.457-.934.554-.951.263-4.286.27-4.663.27Z"
    />
    <Path
      fill="#F20307"
      d="M10.998 13.976a.318.318 0 0 1-.228-.097.335.335 0 0 1-.094-.234v-3.292a.337.337 0 0 1 .16-.287.315.315 0 0 1 .323 0l2.776 1.647c.049.029.09.07.118.12a.337.337 0 0 1-.118.453l-2.776 1.646a.32.32 0 0 1-.161.044Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={24}
        x2={0}
        y1={0}
        y2={26.2}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F20307" />
        <Stop offset={1} stopColor="#8D0002" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgComponent
