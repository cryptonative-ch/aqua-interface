import styled from 'styled-components'
import { Flex, FlexProps } from 'src/components/Flex'

export const Center = styled(Flex)<FlexProps>(
  () => ({
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
)