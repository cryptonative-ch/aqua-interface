//External
import styled from 'styled-components'
import {
  space,
  SpaceProps,
  ColorProps,
  color,
  layout,
  LayoutProps,
  justifyContent,
  JustifyContentProps,
} from 'styled-system'
// Svg
import DownArrowUrl from 'src/assets/svg/Down-Arrow.svg'

export const Wrapper = styled.div<SpaceProps & ColorProps>(
  () => ({
    height: '72px',
    zIndex: 100,
    width: '100%',
    outline: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  space,
  color
)

type MobileMenuProps = {
  expanded: boolean
}

export const MobileMenu = styled.div<MobileMenuProps>(props => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  zIndex: 200,
  top: 0,
  left: 0,
  width: '100vw',
  height: 'calc(100vh)',
  transition: 'transform 0.3s ease-in-out',
  backgroundColor: '#FFF',
  transform: props.expanded ? 'translateX(0)' : 'translateX(-100%)',
}))

export const Row = styled.div({
  padding: '0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
})

type TitleProps = {
  isFooter?: boolean
}

export const Title = styled.div<TitleProps>(props => ({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#000629',
  ...(props.isFooter && {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '21px',
    color: '#7b7f93',
    padding: '0 12px',
    cursor: 'pointer',
    userSelect: 'none',
  }),
}))

Title.defaultProps = {
  isFooter: false,
}

export const MenuOption = styled.div<SpaceProps & ColorProps>(
  () => ({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '21px',
    paddingTop: '16px',
    color: '#7B7F93',
  }),
  space,
  color
)

export const MenuBorder = styled.div({
  border: '1px dashed #DDDDE3',
  boxSizing: 'border-box',
  borderWidth: '1px 0 0 0',
  margin: '16px 0 0',
})

export const Description = styled.div<SpaceProps>(
  () => ({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#7b7f93',
    marginLeft: '5px',
  }),
  space
)

export type ButtonProps = {
  backgroundColor: string
  textColor?: string
} & SpaceProps &
  LayoutProps &
  JustifyContentProps

export const Button = styled.button<ButtonProps>(
  ({ backgroundColor, textColor = 'white' }) => ({
    backgroundColor,
    display: 'flex',
    appearance: 'none',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'inherit',
    lineHeight: 1.5,
    color: textColor,
    height: '40px',
    padding: '0 16px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    border: 'none',
  }),
  space,
  layout,
  justifyContent
)

export const ButtonText = styled.div({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const ButtonImage = styled.img({
  width: '16px',
  height: '16px',
  margin: '0 0 0 16px',
})

ButtonImage.defaultProps = {
  src: DownArrowUrl,
}

export const MenuIcon = styled.img({
  width: '72px',
  height: '24px',
  margin: '0',
})
