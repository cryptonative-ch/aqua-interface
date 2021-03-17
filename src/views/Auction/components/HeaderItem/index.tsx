// External
import styled from 'styled-components'
import { typography, TypographyProps } from 'styled-system'
import React from 'react'

// Components
import { Flex } from 'src/components/Flex'

type HeaderTitleProps = TypographyProps & {
  color: string
}

const HeaderTitle = styled.div<HeaderTitleProps>(
  props => ({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    color: props.color
  }),
  typography
)

const HeaderDescription = styled.div({
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '24px',
  lineHeight: '29px',
  marginTop: '7px',
  fontFeatureSettings: 'ss01 on',
  color: '#000629',
})

interface HeaderItemProps {
  title: string
  description: string
  color: string
  textAlign: string
}

export function HeaderItem({ title, description, color, textAlign }: HeaderItemProps) {
  return (
    <Flex flexDirection="column" marginRight={textAlign === 'right' ? "0" : "100px"}>
      <HeaderTitle textAlign={textAlign === 'left' ? 'left' : 'right'} color={color}>{title}</HeaderTitle>
      {description.length > 0 && (<HeaderDescription>{description}</HeaderDescription>)}
    </Flex>
  )
}

HeaderItem.defaultProps = {
  color: '#7B7F93',
  textAlign: 'left'
}
