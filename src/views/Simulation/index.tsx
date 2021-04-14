// External
import React, { useCallback, useEffect, useRef, useState, Fragment } from 'react'
import { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { BigNumber } from 'ethers'
import numeral from 'numeral'
import { useDispatch, useSelector } from 'react-redux'
import WalletConnector from 'cryptowalletconnector'

// Hooks
import { useElementWidth } from 'src/hooks/useElementWidth'
import { useAuction } from 'src/hooks/useAuction'
import { useGenericModal } from 'src/hooks/useGenericModal'

// Interfaces
import { AuctionBid } from 'src/interfaces/Auction'

// Components
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { BackButton } from 'src/components/BackButton'
import { AuctionHeader } from '../Auction/components/AuctionHeader'
import { PlaceBidForm } from '../Auction/components/PlaceBidForm'
import { Container } from 'src/components/Container'
import { CardTitle } from 'src/components/CardTitle'
import { CardBody } from 'src/components/CardBody'
import { BarChart } from '../Auction/components/BarChart'
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'
import { HeaderItem } from '../Auction/components/HeaderItem'
import { HeaderControl } from '../Auction/components/HeaderControl'
import { SelfBidList } from '../Auction/components/SelfBidList'
import { TokenFooter } from '../Auction/components/TokenFooter'
import { Modal } from 'src/components/Modal'

// Layout
import { Center } from 'src/layouts/Center'

// Mesa Utils
import { isAuctionOpen } from 'src/mesa/auction'
import { calculateClearingPrice } from 'src/mesa/price'

// Wallet Utils
import { getRandomWallet } from 'src/utils/wallets'

// Contexts
import { BidModalContext } from 'src/contexts'

//redux

import { RootState } from 'src/redux/store'

// Svg
import MetamaskImage from 'src/assets/svg/metamask.svg'
import WalletImage from 'src/assets/svg/wallet_connect.svg'

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
  const [connectModal, setModalVisible] = useState<boolean>(false)
  const [showGraph, setShowGraph] = useState<boolean>(false)

  // Simulation data
  const ref = useRef<HTMLElement>()
  const { width: containerWidth } = useElementWidth(ref)
  const [clearingPrice, setClearingPrice] = useState<AuctionBid>()
  const [count, setCount] = useState(0)
  const [updateAuction, setUpdateAuction] = useState(false)
  const [confirmResult, setConfirmResult] = useState(false)
  const dispatch = useDispatch()
  const bids = useSelector<RootState, AuctionBid[]>(state => {
    return state.BidReducer.bids
  })

  const { auction } = useAuction('simulation')
  const [t] = useTranslation()
  const theme = useTheme()
  const { isShown, toggle } = useGenericModal()

  const toggleModal = () => {
    setModalVisible(true)
  }

  const toggleGraph = () => {
    setShowGraph(!showGraph)
  }

  const onConfirm = () => {
    setConfirmResult(true)
    toggle()
  }

  const onCancel = () => {
    setConfirmResult(false)
    toggle()
  }

  const content = (
    <Fragment>
      {t('texts.bidMaybeTooLow')}. {t('texts.doYouWishToContinue')}
    </Fragment>
  )

  const addBid = useCallback(
    (newAuctionBid: AuctionBid) => {
      console.log(newAuctionBid)
    },
    [dispatch]
  )

  useEffect(() => {
    const interval = setInterval(() => setCount(PrevCount => PrevCount + 1), 1000)

    if (auction) {
      setUpdateAuction(isAuctionOpen(auction))
    }
    return () => {
      clearInterval(interval)
    }
  }, [count, auction])

  useEffect(() => {
    if (!userAddress) {
      setUserAddress(getRandomWallet().address)
    }

    //Calculate the virtual
    setClearingPrice(calculateClearingPrice(bids))
    if (auction) {
      if (isAuctionOpen(auction)) {
        // Add 1 random bids every second

        if (bids.length == 0) {
          // dispatch(startBid(initialBid))
        }

        if (bids.length >= 30) {
          return
        }
        const addRandomBidsInterval = setTimeout(
          () =>
            addBid({
              address: getRandomWallet().address,
              tokenIn: BigNumber.from(getRandomInteger(1, 30)), // DAI
              tokenOut: BigNumber.from(getRandomInteger(1, 300)), // SIM/ERC20
            }),
          1000
        )

        return () => {
          clearInterval(addRandomBidsInterval)
        }
      }
    }
  }, [addBid, auction, userAddress, bids, updateAuction])

  if (!auction) {
    return (
      <Center minHeight="100%">
        <Container>Loading</Container>
      </Center>
    )
  }

  return (
    <BidModalContext.Provider
      value={{ toggleModal: toggle, isShown: isShown, result: confirmResult, setResult: setConfirmResult }}
    >
      <Container minHeight="100%" inner={false} noPadding={true}>
        <Modal isShown={isShown} hide={onCancel} modalContent={content} headerText="Warning" onConfirm={onConfirm} />
        <Header connectWallet={toggleModal} isConnecting={connectModal}></Header>
        <Container noPadding>
          <BackButton />
          <AuctionHeader auction={auction} />
          <Flex flexDirection="row" justifyContent="space-between">
            <Flex flexDirection="column" width={'579px'}>
              <Card mb={theme.space[4]} border="none">
                <CardBody display="flex" borderBottom="1px dashed #DDDDE3" padding={theme.space[4]}>
                  <Flex flexDirection="row" alignItems="center" flex={1}>
                    <HeaderItem title="Current Price" description="0.88 DAI/XYZ" />
                    <HeaderItem title="Amount for Sale" description="2,800 XYZ" />
                  </Flex>
                </CardBody>
                <CardBody display="flex" padding={theme.space[4]} border="none">
                  <HeaderControl showGraph={showGraph} toggleGraph={toggleGraph} />
                </CardBody>
                {showGraph && (
                  <CardBody
                    display="flex"
                    padding="8px 24px 24px"
                    border="none"
                    ref={e => {
                      if (e) {
                        ref.current = e
                      }
                    }}
                  >
                    <BarChart
                      width={containerWidth}
                      height={400}
                      data={bids}
                      userAddress={userAddress}
                      vsp={(clearingPrice?.tokenIn.toNumber() || 0) / 5}
                      auction={auction}
                    />
                  </CardBody>
                )}
              </Card>
              <Card mb={theme.space[4]} border="none">
                <CardBody display="flex" padding={theme.space[4]} border="none">
                  <CardTitle fontSize="16px" lineHeight="19px" color="#000629" fontWeight="500">
                    {t('texts.yourBids')}
                  </CardTitle>
                </CardBody>
                <SelfBidList auction={{ ...auction }} clearingPrice={clearingPrice} bids={bids} />
              </Card>
              <TokenFooter auction={auction} />
            </Flex>
            <Flex flexDirection="column" width="377px" marginLeft="24px">
              <Card border="none">
                <CardBody display="flex" borderBottom="1px dashed #DDDDE3" padding={theme.space[4]}>
                  <Flex flexDirection="row" alignItems="center" flex={1}>
                    <HeaderItem title="Place a Bid" description="" color="#000629" />
                  </Flex>
                </CardBody>
                <CardBody display="flex" padding={theme.space[4]}>
                  <PlaceBidForm
                    onSubmit={() => {
                      console.log('Add to Auction')
                    }}
                    auction={auction}
                    currentSettlementPrice={numeral(calculateClearingPrice(auction.bids)).value()}
                  />
                </CardBody>
              </Card>
            </Flex>
          </Flex>
        </Container>
        <WalletConnector
          isOpen={connectModal}
          onClose={() => setModalVisible(false)}
          metamaskImage={MetamaskImage}
          walletImage={WalletImage}
        ></WalletConnector>
        <Footer />
      </Container>
    </BidModalContext.Provider>
  )
}
