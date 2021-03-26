// Externals
import styled from 'styled-components'

// Components
import { Flex } from 'src/components/Flex'

export const BadgeFlex = styled(Flex)(
  {
    flexShrink: 0,
  },
  `
  @media (max-width: 320px) {
    flex-direction: column;
  }
`
)
