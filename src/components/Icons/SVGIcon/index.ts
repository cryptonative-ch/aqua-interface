// Externals
import styled from 'styled-components'
import SVG from 'react-inlinesvg'

// Components
import { Icon } from '../Icon'

interface SVGIconProps {
  color: string
}

export const SVGIcon = styled(SVG)<SVGIconProps>(Icon, props => ({
  color: props.color,
}))
