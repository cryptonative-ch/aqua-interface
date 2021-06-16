// Externals
import styled from 'styled-components'

export const GridListSection = styled.div(
  props => ({
    margin: '0',
    marginBottom: '10vh',
    paddingBottom: '10vh',
    display: props.theme.grid.display,
    gridTemplateColumns: props.theme.grid.gridTemplateColumns[0],
    gap: props.theme.grid.gap[0],
  }),
  props => `
    @media (max-width: ${props.theme.breakpoints[2]}) {
      grid-template-columns: ${props.theme.grid.gridTemplateColumns[1]};
      row-gap: ${props.theme.grid.gap[1]};
    })`
)
