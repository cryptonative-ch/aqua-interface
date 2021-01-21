// External
import styled, { useTheme } from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BigNumber } from 'ethers'

// Hooks
import { useAuction } from 'src/hooks/useAuction'

// Interfaces
import { AuctionBid } from 'src/interfaces/Auction'

// Components
import { PlaceBidForm } from '../Auction/components/PlaceBidForm'
import { BidList } from '../Auction/components/BidList'
import { Header } from '../Auction/components/Header'
import { Container } from 'src/components/Container'
import { CardTitle } from 'src/components/CardTitle'
import { CardBody } from 'src/components/CardBody'
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'

// Views
import { NotFoundView } from '../NotFound'

// Layout
import { Center } from 'src/layouts/Center'

// Mesa Utils
import { calculateClearingPrice } from 'src/mesa/utils'

// Wallet Utils
import { getRandomWallet } from 'src/utils/wallets'

/**
 * Generates a random integer between two numbers (inclusive)
 * @param min
 * @param max
 */
const getRandomInteger = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // max & min both included
}

export function SimulationView() {
  // A random generated Ethereum address for simulation.
  // This will be replaced with Web3 EOA
  const [userAddress, setUserAddress] = useState<string>('')

  // Simulation data
  const [clearingPrice, setClearingPrice] = useState<AuctionBid>()
  const [bids, setBids] = useState<AuctionBid[]>([])

  const auction = useAuction('simulation')
  const [t] = useTranslation()
  const theme = useTheme()

  const addBid = (newAuctionBid: AuctionBid) => {
    setBids([...bids, newAuctionBid])
  }

  useEffect(() => {
    if (!userAddress) {
      setUserAddress(getRandomWallet().address)
    }

    if (auction) {
      setClearingPrice(calculateClearingPrice(auction))
    }

    // Add 1 random bids every second
    const addRandomBidsInterval = setInterval(
      () =>
        addBid({
          address: getRandomWallet().address,
          sellAmount: BigNumber.from(getRandomInteger(1, 30)),
          buyAmount: BigNumber.from(getRandomInteger(1, 300)),
        }),
      2000
    )

    return () => clearInterval(addRandomBidsInterval)
  }, [auction, bids])

  if (!auction) {
    return <NotFoundView />
  }

  return (
    <Center minHeight="100%">
      <Container>
        <Header title="Simulation" />
        <Card mb={theme.space[4]}>
          <CardBody>
            <CardTitle>{t('texts.bids')}</CardTitle>
          </CardBody>
          <CardBody>{JSON.stringify(clearingPrice, null, 2)}</CardBody>
        </Card>
        <FlexGroupColumns>
          <Card mb={theme.space[4]}>
            <CardBody>
              <CardTitle>{t('texts.placeBid')}</CardTitle>
            </CardBody>
            <CardBody>
              <PlaceBidForm
                onSubmit={({ tokenAmount, tokenPrice }) =>
                  addBid({
                    buyAmount: BigNumber.from(tokenAmount),
                    sellAmount: BigNumber.from(tokenPrice),
                    address: userAddress,
                  })
                }
              />
            </CardBody>
          </Card>
          <Card mb={theme.space[4]}>
            <CardBody>
              <CardTitle>{t('texts.bids')}</CardTitle>
            </CardBody>
            <CardBody>
              <BidList baseTokenSymbol="DAI" quotetokenSmybol={auction.tokenSymbol} bids={bids} />
            </CardBody>
          </Card>
        </FlexGroupColumns>
        <Card mb={theme.space[4]}>
          <CardBody>
            <CardTitle>{t('texts.yourBids')}</CardTitle>
          </CardBody>
        </Card>
      </Container>
    </Center>
  )
}

const FlexGroupColumns = styled(Flex)(props => ({
  gap: props.theme.space[4],
  '& > *': {
    flex: 1,
  },
}))
