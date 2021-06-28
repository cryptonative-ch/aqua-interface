// Externals
import React from 'react'

// Internal
import { Wrapper, Content, CloseButtonImage } from 'src/components/Banner/style'

export interface BannerProps {
  error?: boolean
  close?: () => void
}

export const Banner: React.FC<BannerProps> = ({ children, error = false, close }) => {
  return (
    <Wrapper error={error}>
      <Content>{children}</Content>
      {close && <CloseButtonImage onClick={close} />}
    </Wrapper>
  )
}
