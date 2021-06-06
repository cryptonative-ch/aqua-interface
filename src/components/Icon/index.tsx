// Externals
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

export const Icon = styled.img<SpaceProps>(
  {
    height: '45px',
  },
  space,
  props =>
    `
  @media (max-width: ${props.theme.breakpoints[2]}) {
  height: 32px;
  }
  `
)
