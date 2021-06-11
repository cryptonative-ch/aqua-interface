//External
import styled from 'styled-components'
import { SpaceProps, ColorProps } from 'styled-system'

import { Button } from 'src/components/Button'

export const ColumnWrapper = styled.div<SpaceProps & ColorProps>(() => ({
  zIndex: 100,
  width: '100%',
  outline: '0',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '16px',
}))

export const Wrapper = styled.div<SpaceProps & ColorProps>(() => ({
  width: '100%',
  outline: '0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

interface ProgressLineProps {
  size: number
}

export const ProgressLineWrapper = styled.div<ProgressLineProps & SpaceProps & ColorProps>(props => ({
  width: `${props.size + 4}%`,
  outline: '0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '10px auto',
}))

interface StatusProps {
  active: boolean
  complete?: boolean
}

export const Dot = styled.div<StatusProps & SpaceProps & ColorProps>(props => ({
  minWidth: '20px',
  minHeight: '20px',
  borderRadius: '50%',
  background: props.active ? '#4B9E98' : `#DDDDE3`,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '8px',
  fontSize: '12px',
}))

export const Line = styled.div<StatusProps & SpaceProps & ColorProps>(props => ({
  width: '100%',
  background: props.active
    ? 'linear-gradient(90deg, #4b9e98 60%, #dddde3 100%);'
    : props.complete
    ? '#4b9e98'
    : `#DDDDE3`,
  height: '2px',
}))

interface ButtonProps {
  buttonSize: string
}
export const StyledButton = styled(Button)<ButtonProps>(props => ({
  width: props.buttonSize,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexDirection: 'column',
  height: '60px',
}))
