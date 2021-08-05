// Externals
import styled from 'styled-components'
import { SpaceProps } from 'styled-system'

export type TokenIconFigureProps = SpaceProps

export const TokenIconFigure = styled.div<TokenIconFigureProps>(props => ({
  marginRight: (props.marginRight as string) || props.theme.space[3],
}))
