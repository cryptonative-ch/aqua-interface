/* eslint-disable @typescript-eslint/no-unused-vars */
// External
import React, { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
// Utility
import { useWindowSize } from 'src/hooks/useWindowSize'

// Svg
import WarningSVG from 'src/assets/svg/Warning-Icon.svg'
import Tick from 'src/assets/svg/Check-Icon.svg'

//interfaces
import { FixedPriceSalePurchaseStatus } from 'src/subgraph/__generated__/globalTypes'

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

interface TableProps<T> {
  headData: ColumnDataProps[]
  bodyData: BodyDataProps<T>[]
  isClosed: boolean
}
interface ColumnDataProps {
  title: string
  colour?: string
  flex?: string | number
}

interface BodyDataProps<T> {
  title: string
  purchases: T[] | T
  color?: string
}

interface StatusWise {
  status: string | undefined
}

interface RowProps<T> {
  isMobile: boolean
  isClosed: boolean
  title: string
  purchases: T
  color?: string
}

const TableRows = <T extends StatusWise>({ purchases, color, title, isClosed, isMobile }: RowProps<T>) => {
  return (
    <TableRow padding={isMobile ? '0 0 0 10px' : '0 0 0 20px'}>
      <TableColumn>
        <TokenPriceLabel color={color}>{title}</TokenPriceLabel>
      </TableColumn>
      {Object.values(purchases)
        .filter(
          skip => skip !== FixedPriceSalePurchaseStatus.SUBMITTED && skip !== FixedPriceSalePurchaseStatus.CLAIMED
        )
        .map((purchase, index) => {
          return (
            <TableColumn key={index}>
              <TokenPriceLabel>{purchase}</TokenPriceLabel>
            </TableColumn>
          )
        })}
      {isClosed ? (
        <Flex flex={isMobile ? 1 : 2.5} justifyContent="center">
          {purchases.status === FixedPriceSalePurchaseStatus.CLAIMED ? (
            <>
              <IconImg src={Tick} color="#4B9E98" margin={isMobile ? '4px 32px 4px 0px' : '4px 4px 4px 8px'} />
              {!isMobile && (
                <TokenPriceLabel color="#4B9E98" padding="4px 8px 4px 0">
                  Claimed
                </TokenPriceLabel>
              )}
            </>
          ) : (
            <>
              <IconImg src={WarningSVG} margin={'4px 4px 4px 8px'} />
              {!isMobile && (
                <TokenPriceLabel color="#000629" padding="4px 8px 4px 0">
                  Unclaimed
                </TokenPriceLabel>
              )}
            </>
          )}
        </Flex>
      ) : null}
    </TableRow>
  )
}

export const Table = <T extends StatusWise>({ headData, bodyData, isClosed }: TableProps<T>) => {
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
          {bodyData.map(({ purchases, color, title }) => {
            if (!Array.isArray(purchases)) {
              return (
                <TableRows isMobile={isMobile} isClosed={isClosed} purchases={purchases} color={color} title={title} />
              )
            }
            return purchases.map((purchase, purchaseIndex: number) => {
              return (
                <TableRows
                  key={purchaseIndex}
                  isMobile={isMobile}
                  isClosed={isClosed}
                  purchases={purchase}
                  color={color}
                  title={title}
                />
              )
            })
          })}
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
