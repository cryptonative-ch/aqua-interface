// Externals
import React, { useState } from 'react'
import ReactTooltip, { TooltipProps } from 'react-tooltip'
import styled from 'styled-components'

export const StyledTooltip = styled(ReactTooltip)(
  () => ({
    filter: 'drop-shadow(0px 4px 12px rgba(0, 6, 41, 0.1))',
    fontSize: '14px !important',
    fontWeight: 500,
    lineHeight: 1.5,
    maxWidth: '30vh',
    textAlign: 'center',
    padding: '12px !important',
  }),
  () => `
  &.type-light {
    background-color: #fff;
    color: #7b7f93;
    border: 1px solid #dddde3;
    border-radius: 0;

    &.show {
      opacity: 1;
    }

    &.place-bottom::before {
      border-bottom: 7px solid #dddde3;
      top: -7px;
    }

    &.place-top::before {
      border-top: 7px solid #dddde3;
      bottom: -7px;
    }

    &.place-left::before {
      border-left: 7px solid #dddde3;
      right: -7px;
    }

    &.place-right::before {
        border-right: 7px solid #dddde3;
        left: -7px;
      }
  }
`
)

export interface StyledTooltipProps {
  content: React.ReactNode
}

export const Tooltip: React.FC<StyledTooltipProps & TooltipProps> = ({ children, content, ...props }) => {
  const [randomID] = useState(String(Math.random()))

  return (
    <>
      <span data-tip={randomID} data-for={randomID}>
        {children}
      </span>
      <StyledTooltip id={randomID} type="light" effect="solid" place="bottom" {...props}>
        {content}
      </StyledTooltip>
    </>
  )
}
