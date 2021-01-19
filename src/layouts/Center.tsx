import React from 'react'
import { Flex, FlexProps } from 'src/components/Flex'

export const Center: React.FC<FlexProps> = props => (
  <Flex flexDirection="column" alignItems="center" justifyContent="center" {...props} />
)
