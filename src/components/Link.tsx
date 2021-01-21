import { size, SizeProps, space, variant } from 'styled-system'
import { Link as LinkBase } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from 'src/styles/theme'

type LinkProps = SizeProps & {
  variant?: string
}

export const Link = styled(LinkBase)<LinkProps>(
  {
    fontWeight: 'bold',
  },
  size,
  space,
  variant({
    variants: {
      default: {
        color: theme.colors.secondary,
        ':hover': {
          color: theme.colors.secondary,
        },
      },
      button: {
        padding: `${theme.space[2]}px ${theme.space[2]}px`,
      },
    },
  })
)

Link.defaultProps = {
  variant: undefined,
}
