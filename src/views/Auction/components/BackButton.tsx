// External
import styled from 'styled-components'

// Components
import { Link } from 'src/components/Link'

// Svg
import BackArrowUrl from 'src/assets/svg/Back-Arrow.svg'

export const BackButton = styled(Link)(props => ({
  height: 42,
  width: 42,
  borderRadius: '50%',
  border: `1px solid ${props.theme.black}`,
  backgroundImage: `url(${BackArrowUrl})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}))
