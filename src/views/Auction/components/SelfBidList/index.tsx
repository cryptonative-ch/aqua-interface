// External
import styled from 'styled-components'
import { space, SpaceProps, color, ColorProps } from 'styled-system'
import React, { useState } from 'react'

// Components
import { Flex } from 'src/components/Flex'

// Svg
import InfoSVG from 'src/assets/svg/Info-Icon.svg'
import MoreSVG from 'src/assets/svg/More-Icon.svg'
import WarningSVG from 'src/assets/svg/Warning-Icon.svg'

type ColumnLabelProps = SpaceProps

const ColumnLabel = styled.div<ColumnLabelProps>(
  () => ({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '140%',
    color: '#7B7F93',
    marginLeft: '8px',
  }),
  space
)

const TokenPriceLabel = styled.div<ColorProps & SpaceProps>(
  () => ({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '17px',
    padding: '4px 8px',
    color: '#000629',
  }),
  color,
  space
)

const InfoImg = styled.img({
  width: '14px',
  height: '14px',
  marginLeft: '4px',
})

type ModalContainerProps = {
  itemIndex: number
}

const ModalContainer = styled.div<ModalContainerProps>(props => ({
  width: '147px',
  height: '90px',
  padding: '8px 16px',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  right: '24px',
  top: `${props.itemIndex * 50 + 58}px`,
  background: '#FFFFFF',
  boxShadow: '0px 4px 12px rgba(0, 6, 41, 0.1)',
  zIndex: 200,
}))

<<<<<<< HEAD:src/views/Auction/components/SelfBidList.tsx
const ModalMenu = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #7b7f93;
  padding: 8px 0;
  cursor: pointer;
  &:hover {
    color: #304ffe;
  }
`
=======
const ModalMenu = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '21px',
  color: '#7B7F93',
  padding: '8px 0',
  cursor: 'pointer',
  ':hover': {
    color: '#304FFE',
  },
})
>>>>>>> main:src/views/Auction/components/SelfBidList/index.tsx

type IconImgProps = SpaceProps & {
  isButton?: boolean
}

const IconImg = styled.img<IconImgProps>(
  props => ({
    width: '16px',
    height: '16px',
    cursor: props.isButton ? 'pointer' : 'auto',
  }),
  space
)

interface SelfBidListProps {
  status: string
  showGraph: boolean
}

export function SelfBidList({}: SelfBidListProps) {
  const [bidMenu, setBidMenu] = useState<number>(-1)

  const toggleBidMenu = (index: number) => {
    if (bidMenu === index) {
      setBidMenu(-1)
      return
    }
    setBidMenu(index)
  }

  return (
    <Flex flexDirection="column" style={{ position: 'relative' }}>
      <Flex flexDirection="row" alignItems="center" marginBottom="8px" padding="0 16px">
        <Flex flex={3}>
          <ColumnLabel>Token Price</ColumnLabel>
        </Flex>
        <Flex flex={2}>
          <ColumnLabel>Amount</ColumnLabel>
        </Flex>
        <Flex flex={5} flexDirection="row" alignItems="center">
          <ColumnLabel>Est. XYZ</ColumnLabel>
          <InfoImg src={InfoSVG} />
        </Flex>
      </Flex>

      <Flex flexDirection="row" alignItems="center" height="50px" borderTop="1px dashed #DDDDE3" padding="0 16px">
        <Flex flex={3}>
          <TokenPriceLabel backgroundColor="#4B9E985A">0.92 DAI</TokenPriceLabel>
        </Flex>
        <Flex flex={2}>
          <TokenPriceLabel>501 DAI</TokenPriceLabel>
        </Flex>
        <Flex flex={5} flexDirection="row" alignItems="center">
          <TokenPriceLabel>562.18 XYZ</TokenPriceLabel>
          <Flex flex={1} />
          <IconImg src={MoreSVG} marginRight="8px" isButton={true} onClick={() => toggleBidMenu(0)} />
        </Flex>
      </Flex>

      <Flex flexDirection="row" alignItems="center" height="50px" borderTop="1px dashed #DDDDE3" padding="0 16px">
        <Flex flex={3}>
          <TokenPriceLabel backgroundColor="#4B9E985A">0.9 DAI</TokenPriceLabel>
        </Flex>
        <Flex flex={2}>
          <TokenPriceLabel>502 DAI</TokenPriceLabel>
        </Flex>
        <Flex flex={5} flexDirection="row" alignItems="center">
          <TokenPriceLabel>561.18 XYZ</TokenPriceLabel>
          <Flex flex={1} />
          <IconImg src={MoreSVG} marginRight="8px" isButton={true} onClick={() => toggleBidMenu(1)} />
        </Flex>
      </Flex>

      <Flex flexDirection="row" alignItems="center" height="50px" borderTop="1px dashed #DDDDE3" padding="0 16px">
        <Flex flex={3}>
          <TokenPriceLabel backgroundColor="#E15F5F5A">0.86 DAI</TokenPriceLabel>
        </Flex>
        <Flex flex={2}>
          <TokenPriceLabel>500 DAI</TokenPriceLabel>
        </Flex>
        <Flex flex={5} flexDirection="row" alignItems="center">
          <IconImg src={WarningSVG} margin="0 4px 0 8px" />
          <TokenPriceLabel color="#7B7F93" padding="4px 0">
            Below Current Price
          </TokenPriceLabel>
          <Flex flex={1} />
          <IconImg src={MoreSVG} marginRight="8px" isButton={true} onClick={() => toggleBidMenu(2)} />
        </Flex>
      </Flex>
      {bidMenu !== -1 && (
        <ModalContainer itemIndex={bidMenu}>
          <ModalMenu>Change Bid Price</ModalMenu>
          <ModalMenu>Withdraw Bid</ModalMenu>
        </ModalContainer>
      )}
    </Flex>
  )
}

SelfBidList.defaultProps = {
  status: 'active',
  showGraph: false,
}
