// Externals

import styled from 'styled-components'
import SVG from 'react-inlinesvg'

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

interface SVGIconProps {
  color: string
}

export const SVGIcon = styled(SVG)<SVGIconProps>(Icon, props => ({
  color: props.color,
}))
