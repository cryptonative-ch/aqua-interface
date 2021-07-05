/* eslint-disable */
// External
import React, { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
// Utility
import { useWindowSize } from 'src/hooks/useWindowSize'

// Svg
import WarningSVG from 'src/assets/svg/Warning-Icon.svg'
import Tick from 'src/assets/svg/Check-Icon.svg'

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
} from 'src/components/Table/style'
import { Flex } from 'src/components/Flex'

interface TableProps {
  headData: ColumnDataProps[]
  bodyData: BodyDataProps[]
  isClosed: boolean
}
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
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax={200}
        >
          {bodyData.map(({ purchases, color, title }) =>
            purchases.map((purchase: any, index) => {
              return (
                <TableRow key={index} padding={isMobile ? '0 0 0 10px' : '0 0 0 20px'}>
                  <TableColumn>
                    <TokenPriceLabel color={color}>{title}</TokenPriceLabel>
                  </TableColumn>
                  {Object.getOwnPropertyNames(purchase)
                    .filter(skip => skip !== 'status')
                    .map((element: any, _index) => {
                      return (
                        <TableColumn key={_index}>
                          <TokenPriceLabel>{purchase[element]}</TokenPriceLabel>
                        </TableColumn>
                      )
                    })}
                  {isClosed ? (
                    <Flex flex={isMobile ? 1 : 2.5} justifyContent="center">
                      {purchase.status === 'CLAIMED'
                        ? [
                            <IconImg src={Tick} color="#4B9E98" margin={'4px 4px 4px 8px'} />,
                            !isMobile && (
                              <TokenPriceLabel color="#4B9E98" padding="4px 8px 4px 0">
                                Claimed
                              </TokenPriceLabel>
                            ),
                          ]
                        : [
                            <IconImg src={WarningSVG} margin={'4px 4px 4px 8px'} />,

                            !isMobile && (
                              <TokenPriceLabel color="#000629" padding="4px 8px 4px 0">
                                Unclaimed
                              </TokenPriceLabel>
                            ),
                          ]}
                    </Flex>
                  ) : null}
                </TableRow>
              )
            })
          )}
        </Scrollbars>
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
