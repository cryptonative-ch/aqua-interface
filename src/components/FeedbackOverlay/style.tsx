//External
import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 500;

  @media (max-width: 440px) {
    background-color: rgba(0, 0, 0, 0.4);
  }
`

export const ModalWrapper = styled.div`
  position: fixed;
  bottom: 108px;
  right: 32px;
  z-index: 700;
  width: 100%;
  max-width: 400px;
  outline: 0;

  @media (max-width: 440px) {
    left: 0;
    right: 0;
  }
`

export const FeedbackModal = styled.div`
  z-index: 100;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0 10px;
  position: relative;
  margin: auto;
`
export const Header = styled.div`
  background: #304ffe;
  padding: 28px;
  border-radius: 10px 10px 0 0;
`
export const HeaderBrand = styled.div`
  color: #fff;
  font-family: Inter;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 12px;

  & strong {
    font-weight: 600;
  }
`
export const HeaderTitle = styled.div`
  color: #fff;
  font-family: Inter;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
`
export const Content = styled.div`
  background: #f8f8f8;
  color: #7b7f93;
  padding: 28px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
`

export const FeedbackWrapper = styled.div`
  position: fixed;
  bottom: 48px;
  right: 32px;
  z-index: 600;
  outline: 0;
`

export const FeedbackButton = styled.button`
  background-color: #304ffe;
  color: #fff;
  font-size: 24px;
  height: 48px;
  width: 48px;
  border: none;
  border-radius: 50%;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
`

export const FeedbackCard = styled.a`
  display: block;
  background: #fff;
  border: 1px solid #dddde3;
  padding: 16px;
  margin-bottom: 16px;

  &:hover {
    text-decoration: none;
    border-color: #304ffe;
  }
`

export const FeedbackCardRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const FeedbackCardIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 16px;
`

export const FeedbackCardTitle = styled.div`
  color: #182626;
  font-size: 16px;
  font-weight: 500;
`

export const FeedbackCardDescription = styled.div`
  font-size: 14px;
  color: #768282;
`

export const FeedbackCardTitleIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-bottom: 3px;
  margin-left: 4px;
`
