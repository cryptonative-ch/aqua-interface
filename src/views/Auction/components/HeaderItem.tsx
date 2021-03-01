// External
import styled from 'styled-components'
import React from 'react'

// Components
import { Flex } from 'src/components/Flex'

const HeaderTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #7B7F93;
`

const HeaderDescription = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  font-feature-settings: 'ss01' on;
  color: #000629;
`

interface HeaderItemProps {
  title: string
  description: string
}

export function HeaderItem({ title, description }: HeaderItemProps) {
  return (
    <Flex flexDirection="column" justifyContent="space-between" height="55px" marginRight="100px">
      <HeaderTitle>{title}</HeaderTitle>
      <HeaderDescription>{description}</HeaderDescription>
    </Flex>
  )
}
