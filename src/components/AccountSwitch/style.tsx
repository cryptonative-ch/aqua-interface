//External
import styled from 'styled-components'
import { ColorProps, LayoutProps } from 'styled-system'

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 500;

  @media (max-width: 640px) {
    background-color: rgba(0, 0, 0, 0.4);
  }
`

export const Wrapper = styled.div`
  position: absolute;
  top: 56px;
  right: 32px;
  z-index: 700;
  width: 100%;
  max-width: 350px;
  outline: 0;
  border: 1px solid #d4d4d4;

  @media (max-width: 640px) {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: initial;
  }
`

export const Container = styled.div`
  z-index: 100;
  box-shadow: 0px 4px 12px rgba(0, 6, 41, 0.1);
  position: relative;
  margin: auto;
`

type SwitcherSectionProps = LayoutProps &
  ColorProps & {
    grey?: boolean
  }

export const Section = styled.div<SwitcherSectionProps>`
  background: ${props => (props.grey ? '#f2f2f2' : '#fff')};
  padding: 24px;
`
export const SectionTitle = styled.div`
  font-family: Inter;
  font-size: 16px;
  text-align: center;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Content = styled.div`
  background: #f8f8f8;
  color: #7b7f93;
  padding: 28px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 640px) {
    border-radius: 0 0 10px 10px;
  }
`

export const ListLabel = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin: 8px 0;
`

export const ItemWrapper = styled.div`
  border: 1px solid #dddde3;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 12px;
  cursor: pointer;

  &:hover {
    border-color: #304ffe;
  }
`

export const ItemTitle = styled.div`
  color: #000;
  font-family: 'Inter';
`

export const ItemIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 6px;
`

export const SectionDivider = styled.hr`
  border: 1px dashed #dddde3;
  margin: 0;
`
