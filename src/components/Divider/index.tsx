// Externals
import { ColorProps, LayoutProps, PositionProps, BorderProps } from 'styled-system'
import React from 'react'
import styled from 'styled-components'

//Components
import { Flex } from 'src/components/Flex'

export type DividerProps = LayoutProps & PositionProps & BorderProps & ColorProps

export const Divider = styled.div<DividerProps>(props => ({
  position: 'relative',
  width: '100%',
  border: 'none',
  borderTop: `1px dashed ${props.color || '#dddde3'}`,
  margin: '0',
}))

const Content = styled.span({
  padding: '0 10px 0 10px',
})

interface DividerWithTextProps {
  children: React.ReactNode
  color: string
}

export const DividerWithText = ({ children, color }: DividerWithTextProps) => {
  return (
    <Flex alignItems="center">
      <Content>{children}</Content>
      <Divider color={color} />
    </Flex>
  )
}
