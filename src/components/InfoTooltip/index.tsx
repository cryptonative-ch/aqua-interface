// Externals
import React from 'react'
import styled from 'styled-components'

// Svg
import InfoIconSVG from 'src/assets/svg/Info-Icon.svg'
import { Tooltip } from '../Tooltip'

const InfoIconImg = styled.img({
  position: 'relative',
  width: '18px',
  height: '18px',
  top: '-2px',
})

export const InfoTooltip: React.FC = ({ children }) => {
  return (
    <Tooltip content={<span>{children}</span>}>
      <InfoIconImg src={InfoIconSVG} />
    </Tooltip>
  )
}
