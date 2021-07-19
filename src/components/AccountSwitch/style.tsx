//External
import styled from 'styled-components'
import { ColorProps, LayoutProps } from 'styled-system'

export const Backdrop = styled.div({
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 500,
  '@media (max-width: 640px)': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
})

export const Wrapper = styled.div({
  position: 'absolute',
  top: '56px',
  right: '32px',
  zIndex: 500,
  width: '100%',
  maxWidth: '350px',
  outline: '0',
  border: '1px solid #d4d4d4',
  '@media (max-width: 640px)': {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 'initial',
  },
})

export const Container = styled.div({
  zIndex: 100,
  boxShadow: '0px 4px 12px rgba(0, 6, 41, 0.1)',
  position: 'relative',
  margin: 'auto',
})

type SwitcherSectionProps = LayoutProps &
  ColorProps & {
    grey?: boolean
  }

export const Section = styled.div<SwitcherSectionProps>(props => ({
  background: props.grey ? '#f2f2f2' : '#fff',
  padding: '24px',
}))

export const SectionTitle = styled.div({
  fontFamily: 'Inter',
  fontSize: '16px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Content = styled.div({
  background: '#f8f8f8',
  color: '#7b7f93',
  padding: '28px',
  maxHeight: '30rem',
  overflowX: 'hidden',
  overflowY: 'auto',
  '@media (max-width: 640px)': {
    borderRadius: '0 0 10px 10px',
  },
})

export const ListLabel = styled.div({
  fontSize: '14px',
  color: 'rgba(0, 0, 0, 0.6)',
  margin: '8px 0',
})

export const ListWrapper = styled.div({
  marginTop: '24px',
})

export const ItemWrapper = styled.div({
  border: '1px solid #dddde3',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
  padding: '12px',
  cursor: 'pointer',
  '&:hover': { borderColor: '#304ffe' },
})

export const ItemTitle = styled.div({
  color: '#000',
  fontFamily: 'Inter',
})

export const ItemIcon = styled.img({
  width: '24px',
  height: '24px',
  marginRight: '6px',
})

export const SectionDivider = styled.hr({
  border: '1px dashed #dddde3',
  margin: '0',
  background: '#f2f2f2',
})
