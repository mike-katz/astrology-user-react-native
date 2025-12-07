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
    <Circle cx={54} cy={54} r={54} fill="#F6F3F9" />
    <Path
      stroke={colors.primaryColor}
      strokeMiterlimit={10}
      d="M53.012 40.412H29.497A4.496 4.496 0 0 0 25 44.91v27.898a4.496 4.496 0 0 0 4.497 4.497h41.906a4.496 4.496 0 0 0 4.497-4.497V60.224M57.569 64.326h8.539M57.569 70.817h12.754"
    />
    <Path
      stroke={colors.primaryColor}
      strokeMiterlimit={10}
      d="M41.967 59.34a6.263 6.263 0 1 0 0-12.526 6.263 6.263 0 0 0 0 12.526ZM51.875 71.387H31.833v-4.612a7.346 7.346 0 0 1 7.345-7.345h5.352a7.346 7.346 0 0 1 7.345 7.345v4.612ZM57 33.238s-3.757 20.156 12.184 26.078c0 0 15.486-5.124 12.412-25.509 0 0-7.174.57-12.526-5.807 0 0-7.174 6.716-12.07 5.238Z"
    />
    <Path
      stroke={colors.primaryColor}
      strokeMiterlimit={10}
      d="m61.895 41.89 6.264 6.264L76.13 39.5"
    />
  </Svg>
)
export default SvgComponent
