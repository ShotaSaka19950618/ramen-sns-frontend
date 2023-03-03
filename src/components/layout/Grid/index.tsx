import styled from "styled-components"
import Box, { BoxProps } from "components/layout/Box"
import type {
  Responsive,
  CSSPropertyGridArea,
  CSSPropertyGridAutoFlow,
  CSSPropertyGridColumn,
  CSSPropertyGridRow,
} from "types"
import { toPropValue } from "utils/styles"

// Gridで使いそうなプロパティ
type GridProps = BoxProps & {
  gridGap?: Responsive<string>
  gridColumnGap?: Responsive<string>
  gridRowGap?: Responsive<string>
  gridRow?: Responsive<CSSPropertyGridRow>
  gridColumn?: Responsive<CSSPropertyGridColumn>
  gridAutoFlow?: Responsive<CSSPropertyGridAutoFlow>
  gridAutoColumns?: Responsive<string>
  gridAutoRows?: Responsive<string>
  gridTemplateColumns?: Responsive<string>
  gridTemplateRows?: Responsive<string>
  gridTemplateAreas?: Responsive<CSSPropertyGridArea>
  gridArea?: Responsive<string>
}

// Gridコンポーネント
const Grid = styled(Box)<GridProps>`
  ${(props) => toPropValue("grid-gap", props.gridGap, props.theme)}
  ${(props) => toPropValue("grid-column-gap", props.gridColumnGap, props.theme)}
  ${(props) => toPropValue("grid-row-gap", props.gridRowGap, props.theme)}
  ${(props) => toPropValue("grid-row", props.gridRow, props.theme)}
  ${(props) => toPropValue("grid-column", props.gridColumn, props.theme)}
  ${(props) => toPropValue("grid-auto-flow", props.gridAutoFlow, props.theme)}
  ${(props) =>
    toPropValue("grid-auto-columns", props.gridAutoColumns, props.theme)}
  ${(props) => toPropValue("grid-auto-rows", props.gridAutoRows, props.theme)}
  ${(props) =>
    toPropValue(
      "grid-template-columns",
      props.gridTemplateColumns,
      props.theme,
    )}
  ${(props) =>
    toPropValue("grid-template-rows", props.gridTemplateRows, props.theme)}
  ${(props) =>
    toPropValue("grid-template-areas", props.gridTemplateAreas, props.theme)}
  ${(props) => toPropValue("grid-area", props.gridArea, props.theme)}
`

Grid.defaultProps = {
  display: "grid",
}

export default Grid
