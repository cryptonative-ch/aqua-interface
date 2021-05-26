// Externals

import styled from 'styled-components'

export const Icon = styled.img(
  {
    height: '45px',
  },
  props =>
    `
  @media (max-width: ${props.theme.breakpoints[2]}) {
  height: 32px;
  }
  `
)
