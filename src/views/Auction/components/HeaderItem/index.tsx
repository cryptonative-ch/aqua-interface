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
    color: props.color,
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

const MobileHeaderDescription = styled.div({
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '19px',
  color: '#000629',
  marginLeft: 'auto',
})

interface HeaderItemProps {
  title: string
  description: string
  color: string
  textAlign: string
  isMobile: boolean
  flexAmount?: number
}

export function HeaderItem({ title, description, color, textAlign, isMobile, flexAmount }: HeaderItemProps) {
  return (
    <Flex
      flexDirection={isMobile ? 'row' : 'column'}
      alignItems={isMobile ? 'center' : 'unset'}
      marginRight={isMobile ? '0' : textAlign === 'right' ? '0' : flexAmount !== 1 ? '60px' : '100px'}
      marginBottom={isMobile ? '16px' : '0'}
      flex={flexAmount}
    >
      <HeaderTitle textAlign={textAlign === 'left' ? 'left' : 'right'} color={color}>
        {title}
      </HeaderTitle>
      {isMobile ? (
        <MobileHeaderDescription>{description}</MobileHeaderDescription>
      ) : (
        description.length > 0 && <HeaderDescription>{description}</HeaderDescription>
      )}
    </Flex>
  )
}

HeaderItem.defaultProps = {
  color: '#7B7F93',
  textAlign: 'left',
  isMobile: false,
  flexAmount: 1
}
