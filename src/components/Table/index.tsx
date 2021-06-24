// External
import styled from 'styled-components'
import { space, SpaceProps, color, ColorProps } from 'styled-system'
import React, { useState } from 'react'

// Components
import { Flex } from 'src/components/Flex'

// Utility
import { useWindowSize } from 'src/hooks/useWindowSize'

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

const HeaderColumn = styled(Flex)({
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  flex: '3',
})

const TableRow = styled(Flex)({
  flexDirection: 'row',
  alignItems: 'center',
  minHeight: '50px',
  borderTop: '1px dashed #DDDDE3',
})

const TableColumn = styled(HeaderColumn)({})

const TableContainer = styled(Flex)({
  maxHeight: '200px',
  flexDirection: 'column',
  position: 'relative',
})
const TableHead = styled(Flex)({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '8px',
})

const TableBody = styled(Flex)({
  overflowY: 'scroll',
  flexDirection: 'column',
})
interface TableProps {
  headData: string[]
  bodyData: any[]
  customClass: any
}

export const Table = ({ headData, bodyData }: TableProps) => {
  const [tableMenu, setBidMenu] = useState<number>(-1)

  const { isMobile } = useWindowSize()

  const toggleBidMenu = (index: number) => {
    if (tableMenu === index) {
      setBidMenu(-1)
      return
    }
    setBidMenu(index)
  }

  return (
    <TableContainer>
      <TableHead>
        {headData.map((headers, index) => {
          return (
            <HeaderColumn key={index}>
              <ColumnLabel>{headers}</ColumnLabel>
            </HeaderColumn>
          )
        })}
      </TableHead>
      <TableBody>
        {bodyData.map((body, index) => {
          return (
            <TableRow key={index} padding={isMobile ? '0 8px' : '0 16px'}>
              <TableColumn>
                <TokenPriceLabel color="#000629">{body}</TokenPriceLabel>
              </TableColumn>
            </TableRow>
          )
        })}
        <TableRow>
          <Flex flex={isMobile ? 1 : 3}>
            <IconImg src={WarningSVG} margin={'4px 4px 4px 8px'} />
            {!isMobile && (
              <TokenPriceLabel color="#000629" padding="4px 8px 4px 0">
                Unclaimed
              </TokenPriceLabel>
            )}
          </Flex>
        </TableRow>
      </TableBody>
      {tableMenu !== -1 && (
        <ModalContainer itemIndex={tableMenu}>
          <ModalMenu>Change Bid Price</ModalMenu>
          <ModalMenu>Withdraw Bid</ModalMenu>
        </ModalContainer>
      )}
    </TableContainer>
  )
}
