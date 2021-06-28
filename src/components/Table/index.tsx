/* eslint-disable */
// External
import React, { useState } from 'react'

// Utility
import { useWindowSize } from 'src/hooks/useWindowSize'

// Svg
import WarningSVG from 'src/assets/svg/Warning-Icon.svg'

// Components
import {
  TableContainer,
  TableHead,
  HeaderColumn,
  ColumnLabel,
  TableBody,
  TableRow,
  TableColumn,
  TokenPriceLabel,
  IconImg,
  ModalContainer,
  ModalMenu,
} from './style'
import { Flex } from 'src/components/Flex'

interface ColumnDataProps {
  title: string
  colour?: string
  flex?: string | number
}

interface BodyDataProps {
  title: string
  purchases: any[]
  color?: string
}

interface TableProps {
  headData: ColumnDataProps[]
  bodyData: BodyDataProps[]
  isClosed: boolean
}

export const Table = ({ headData, bodyData, isClosed }: TableProps) => {
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
        {headData.map(({ title, flex }, index) => {
          return (
            <HeaderColumn key={index} flex={flex}>
              <ColumnLabel>{title}</ColumnLabel>
            </HeaderColumn>
          )
        })}
      </TableHead>
      <TableBody>
        {bodyData.map(({ purchases, color, title }) =>
          purchases.map((purchase: any, index) => {
            return (
              <TableRow key={index} padding={isMobile ? '0 8px' : '0 16px'}>
                <TableColumn>
                  <TokenPriceLabel color={color}>{title}</TokenPriceLabel>
                </TableColumn>
                {Object.getOwnPropertyNames(purchase).map((element: any, _index) => {
                  return (
                    <TableColumn key={_index}>
                      <TokenPriceLabel color={color}>{purchase[element]}</TokenPriceLabel>
                    </TableColumn>
                  )
                })}
                {isClosed ? (
                  <Flex flex={isMobile ? 1 : 2.5} justifyContent="center">
                    <IconImg src={WarningSVG} margin={'4px 4px 4px 8px'} />
                    {!isMobile && (
                      <TokenPriceLabel color="#000629" padding="4px 8px 4px 0">
                        Unclaimed
                      </TokenPriceLabel>
                    )}
                  </Flex>
                ) : null}
              </TableRow>
            )
          })
        )}
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
Table.defaultProps = {
  isClosed: false,
}
