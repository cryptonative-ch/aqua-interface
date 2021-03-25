// Externals
import { LayoutProps, PositionProps, BorderProps } from 'styled-system'
import styled from 'styled-components'

export type DividerProps = LayoutProps & PositionProps & BorderProps

export const Divider = styled.hr<DividerProps>(
  {
    position: 'relative',
    width: '100%',
    border: 'none',
    borderTop: '1px dashed #dddde3',
    margin: '0',
  }
)
