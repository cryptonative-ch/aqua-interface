// External
import styled from 'styled-components'

export const ConfirmButton = styled.button`
  font-size: 12px;
  align-items: center;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: flex;
  line-height: 16px;
  font-weight: 400;
  height: 40px;
  justify-content: center;
  letter-spacing: 0.2px;
  outline: none;
  padding: 12px 17px;
  pointer-events: 'none';
  text-align: center;
  transition: all 0.15s ease-out;
  user-select: none;
  white-space: nowrap;
  font-family: Roboto;
  margin: 20px 0 0 auto;
  background-color: rgb(92, 107, 192);
  border-color: rgb(92, 107, 192);
  color: rgb(255, 255, 255);

  @media (min-width: 800px) {
    font-size: 14px;
  }
`
