// External
import styled from 'styled-components'
import { LayoutProps, background, ColorProps, layout, color, variant } from 'styled-system'

type BadgeProps = LayoutProps &
  ColorProps & {
    variant?: string
  }

export const Badge = styled.div<BadgeProps>(
  () => ({
    borderRadius: '0px',
    justifyContent: 'center',
    margin: '4px 4px',
  }),
  props =>
    `
@media (max-width: ${props.theme.breakpoints[2]}) {
  padding: 4px, 8px, 4px, 8px
}
`,
  layout,
  color,
  background,
  variant({
    variants: {
      public: {
        background: '#000629',
      },
      in: {
        background: 'rgba(75, 158, 152, 0.35)',
      },
      out: {
        background: 'rgba(225, 95, 95, 0.35)',
      },
    },
  })
)

export const Content = styled.h3(
  {
    fontFamily: 'Inter',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    letterSpacing: '0',
    textAlign: 'center',
    color: 'white',
    justifyContent: 'center',
    margin: '0px',
    padding: '4px 8px',
  },
  props =>
    `
@media (max-width: ${props.theme.breakpoints[2]}) {
  font-size: 14px;
}
`
)

Badge.defaultProps = {
  variant: 'public',
}
