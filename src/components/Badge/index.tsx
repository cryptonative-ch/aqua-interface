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
    fontFamily: 'Inter',
    fontSize: '16px',
    verticalAlign: 'middle',
    fontStyle: 'normal',
    fontWeight: 500,
    letterSpacing: '0',
    textAlign: 'center',
    color: 'white',
    padding: '4px 8px',
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
        color: 'white',
      },
      in: {
        background: 'rgba(75, 158, 152, 0.35)',
        color: '#000629',
      },
      out: {
        background: 'rgba(225, 95, 95, 0.35)',
        color: '#000629',
      },
    },
  })
)

Badge.defaultProps = {
  variant: 'public',
}
