// External
import styled from 'styled-components'

export const ItemWrapper = styled.div`
  border: 1px solid #dddde3;
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  padding: 16px;
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
`

export const ItemIconLarge = styled.img`
  width: 48px;
  height: 48px;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
`

export const StatusText = styled.div`
  color: #000;
  font-family: 'Inter';
  font-size: 18px;
  font-weight: 500;
  margin: 16px 0;
`
