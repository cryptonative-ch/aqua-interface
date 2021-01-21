// External
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

// Hoooks
import { useBlockNumber } from 'src/hooks/useBlockNumber'
import { useBlock } from 'src/hooks/useBlock'

// Mesa utils
import { isAuctionOpen, isAuctionUpcoming } from 'src/mesa/utils'

// Interfaces
import { Auction } from 'src/interfaces/Auction'

interface AuctionStatusComponentProps {
  auction: Auction
}

export function AuctionStatus({ auction }: AuctionStatusComponentProps) {
  const blockNumber = useBlockNumber()
  const currentBlock = useBlock(blockNumber)
  const auctionEndBlock = useBlock(auction.endBlock)
  const auctionStartBlock = useBlock(auction.startBlock)
  const [toTimestamp, setToTimestamp] = useState<number>()

  useEffect(() => {
    if (currentBlock) {
      console.log({ currentBlock })
    }

    if (isAuctionOpen(auction, blockNumber)) {
      setToTimestamp(auctionEndBlock?.timestamp)
    } else if (isAuctionUpcoming(auction, blockNumber)) {
      setToTimestamp(auctionStartBlock?.timestamp)
    }

    console.log({ currentBlock, auctionStartBlock, auctionEndBlock })
  }, [currentBlock, auctionStartBlock, auctionEndBlock])

  return <div>{dayjs().to(dayjs(toTimestamp))}</div>
}
