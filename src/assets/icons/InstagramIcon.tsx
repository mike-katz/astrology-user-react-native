import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  RadialGradient,
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
    <Path
      fill="url(#a)"
      d="M18.857 0H5.143A5.143 5.143 0 0 0 0 5.143v13.714A5.143 5.143 0 0 0 5.143 24h13.714A5.143 5.143 0 0 0 24 18.857V5.143A5.143 5.143 0 0 0 18.857 0Z"
    />
    <Path
      fill="url(#b)"
      d="M18.857 0H5.143A5.143 5.143 0 0 0 0 5.143v13.714A5.143 5.143 0 0 0 5.143 24h13.714A5.143 5.143 0 0 0 24 18.857V5.143A5.143 5.143 0 0 0 18.857 0Z"
    />
    <Path
      fill="url(#c)"
      d="M18.857 0H5.143A5.143 5.143 0 0 0 0 5.143v13.714A5.143 5.143 0 0 0 5.143 24h13.714A5.143 5.143 0 0 0 24 18.857V5.143A5.143 5.143 0 0 0 18.857 0Z"
    />
    <Path
      fill="#fff"
      d="M18.001 7.286a1.286 1.286 0 1 1-2.571 0 1.286 1.286 0 0 1 2.571 0Z"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M12 16.286a4.286 4.286 0 1 0 0-8.571 4.286 4.286 0 0 0 0 8.571Zm0-1.714a2.571 2.571 0 1 0 0-5.143 2.571 2.571 0 0 0 0 5.143Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M3.43 11.658c0-2.88 0-4.32.56-5.42A5.143 5.143 0 0 1 6.238 3.99c1.1-.56 2.54-.56 5.42-.56h.686c2.88 0 4.32 0 5.42.56a5.143 5.143 0 0 1 2.248 2.248c.56 1.1.56 2.54.56 5.42v.686c0 2.88 0 4.32-.56 5.42a5.143 5.143 0 0 1-2.247 2.248c-1.1.56-2.54.56-5.421.56h-.686c-2.88 0-4.32 0-5.42-.56a5.143 5.143 0 0 1-2.248-2.247c-.56-1.1-.56-2.54-.56-5.421v-.686Zm8.228-6.514h.686c1.468 0 2.467.001 3.238.064.752.062 1.136.173 1.404.31.645.328 1.17.853 1.498 1.498.137.268.248.652.31 1.404.063.772.064 1.77.064 3.238v.686c0 1.468-.001 2.467-.064 3.238-.061.752-.173 1.136-.31 1.404a3.43 3.43 0 0 1-1.498 1.498c-.268.137-.652.248-1.404.31-.771.063-1.77.064-3.238.064h-.686c-1.468 0-2.466-.001-3.238-.064-.752-.061-1.136-.173-1.404-.31a3.429 3.429 0 0 1-1.498-1.498c-.137-.268-.248-.652-.31-1.404-.063-.771-.064-1.77-.064-3.238v-.686c0-1.468.001-2.466.064-3.238.062-.752.173-1.136.31-1.404a3.429 3.429 0 0 1 1.498-1.498c.268-.137.652-.248 1.404-.31.772-.063 1.77-.064 3.238-.064Z"
      clipRule="evenodd"
    />
    <Defs>
      <RadialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(-55.376 21.437 .833) scale(21.8739)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#B13589" />
        <Stop offset={0.793} stopColor="#C62F94" />
        <Stop offset={1} stopColor="#8A3AC8" />
      </RadialGradient>
      <RadialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(-65.136 23.315 6.39) scale(19.3665)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E0E8B7" />
        <Stop offset={0.445} stopColor="#FB8A2E" />
        <Stop offset={0.715} stopColor="#E2425C" />
        <Stop offset={1} stopColor="#E2425C" stopOpacity={0} />
      </RadialGradient>
      <RadialGradient
        id="c"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(-8.13 5.388 9.474) scale(33.3351 7.13002)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.157} stopColor="#406ADC" />
        <Stop offset={0.468} stopColor="#6A45BE" />
        <Stop offset={1} stopColor="#6A45BE" stopOpacity={0} />
      </RadialGradient>
    </Defs>
  </Svg>
)
export default SvgComponent
