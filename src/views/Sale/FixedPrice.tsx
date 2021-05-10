/* eslint-disable @typescript-eslint/no-explicit-any */

// External
import React, { useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { ethers } from 'ethers'
import { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import WalletConnector from 'cryptowalletconnector'
import numeral from 'numeral'
import styled from 'styled-components'

// Hooks
import { useWindowSize } from 'src/hooks/useWindowSize'

// Actions
import { setPageTitle } from 'src/redux/page'

// Components
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { BackButton } from 'src/components/BackButton'
import { SaleHeader } from './components/SaleHeader'
import { PlaceBidForm } from './components/PlaceBidForm'
import { Container } from 'src/components/Container'
import { CardTitle } from 'src/components/CardTitle'
import { CardBody } from 'src/components/CardBody'
import { MobileFooter } from 'src/components/MobileFooter'
import { Card } from 'src/components/Card'
import { Flex } from 'src/components/Flex'
import { FormButton } from 'src/components/FormButton'
import { HeaderItem } from './components/HeaderItem'
import { HeaderControl } from './components/HeaderControl'
import { SelfBidList } from './components/SelfBidList'
import { TokenFooter } from './components/TokenFooter'
// Svg
import MetamaskImage from 'src/assets/svg/metamask.svg'
import WalletImage from 'src/assets/svg/wallet_connect.svg'

// Mesa Utils
import { isSaleClosed, isSaleOpen, isSaleUpcoming } from 'src/mesa/sale'
import { timeFrame, secondsTohms } from 'src/views/Sale/components/Timer'

// Wallet Utils
import { getRandomWallet } from 'src/utils/wallets'

// Views
import { NotFoundView } from 'src/views/NotFound'

// Interfaces
import { Sale } from 'src/interfaces/Sale'

// Constants
import { FIXED_PRICE_SALE_CONTRACT_ADDRESS } from 'src/constants'
import FixedPriceSaleABI from 'src/constants/FixedPriceSale.json'
import { RootState } from 'src/redux/store'
import { fetchSales } from 'src/redux/SaleListings'
import { salesRequest } from 'src/subgraph/Sales'
import { ENDPOINT, subgraphCall } from 'src/subgraph'
import { saleBidsQuery } from 'src/subgraph/SaleBids'
import { fetchSaleBids } from 'src/redux/BidData'

// Mesa Utils
import { formatBigInt } from 'src/utils/Defaults'
import { getBidDataFromChain } from 'src/blockchain'

const FixedFormMax = styled.div({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#7B7F93',
})

type BidFormProps = {
  tokenAmount: number
  tokenPrice: number
}

export interface FixedPriceSaleViewParams {
  saleId: string
}

export function FixedPriceSaleView() {
  const wallet = useWallet()
  const { isMobile } = useWindowSize()
  const walletAddress = wallet.account ? `${wallet.account.substr(0, 6)}...${wallet.account.substr(-4)}` : ''
  const [fixedPriceContract, setFixedPriceContract] = useState<ethers.Contract>()
  const [connectModal, setModalVisible] = useState<boolean>(false)
  const [showGraph, setShowGraph] = useState<boolean>(false)
  const [userAddress, setUserAddress] = useState<string>('')

  const params = useParams<FixedPriceSaleViewParams>()
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const theme = useTheme()

  const fetchData = () => dispatch(fetchSales(salesRequest))

  const sale = useSelector<RootState, Sale>(state => {
    const sales = state.SaleReducer.sales.filter(sale => sale.id == params.saleId)[0]
    return sales
  })

  const bidsBySale = useSelector<RootState, any>(state => {
    return state.bidReducer.bidsBySaleId[params.saleId]
  })

  const bids = bidsBySale ? bidsBySale.bids : []

  const toggleModal = () => {
    setModalVisible(true)
  }

  const toggleGraph = () => {
    if (showGraph || (sale && bids && bids.length > 0)) {
      setShowGraph(!showGraph)
    }
  }

  const buyToken = async ({ tokenAmount }: BidFormProps) => {
    if (fixedPriceContract) {
      try {
        const closed = await fixedPriceContract.buyTokens(tokenAmount)
        console.log(closed)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (!wallet.chainId || !wallet.ethereum || !wallet.account) {
      return
    }
    // An example Provider
    const provider = new ethers.providers.Web3Provider(wallet.ethereum as ethers.providers.ExternalProvider)
    // An example Signer
    const signer = provider.getSigner(0)
    setFixedPriceContract(new ethers.Contract(FIXED_PRICE_SALE_CONTRACT_ADDRESS, FixedPriceSaleABI, signer))
  }, [wallet])

  useEffect(() => {
    if (!userAddress) {
      setUserAddress(walletAddress || getRandomWallet().address)
    }

    if (sale) {
      const provider = new ethers.providers.JsonRpcProvider()
      const saleBidsRequest = subgraphCall(ENDPOINT, saleBidsQuery(params.saleId, sale.type))
      const fetchBids = () => dispatch(fetchSaleBids(params.saleId, sale.type, saleBidsRequest))
      fetchBids()
      getBidDataFromChain(params.saleId, sale.type, provider, sale.tokenOut.decimals)
    }
    dispatch(setPageTitle(t(sale?.name as string)))
  }, [t, sale])

  if (!sale) {
    fetchData()
    if (!sale) {
      return <NotFoundView />
    }
  }

  return (
    <Container minHeight="100%" inner={false} noPadding={true}>
      <Header connectWallet={toggleModal} isConnecting={connectModal}></Header>
      <Container noPadding>
        {!isMobile && <BackButton />}
        <SaleHeader sale={sale} />
        <Flex flexDirection="row" justifyContent="space-between">
          <Flex flexDirection="column" flex={1}>
            <Card border="none" marginX={isMobile ? '8px' : '0'}>
              <CardBody
                display="flex"
                borderBottom="1px dashed #DDDDE3"
                padding={isMobile ? '16px 16px 0 16px' : theme.space[4]}
              >
                {isMobile ? (
                  <Flex flexDirection="column" flex={1}>
                    <HeaderItem
                      isMobile
                      title="Price"
                      description={`${formatBigInt(sale.tokenPrice, sale.tokenOut.decimals).toFixed(2)} DAI/${
                        sale.tokenOut?.symbol
                      }`}
                    />
                    <HeaderItem
                      isMobile
                      title={isSaleClosed(sale) ? 'Amount Sold' : 'Min. - Max. Allocation'}
                      description={`${numeral(formatBigInt(sale.allocationMin, sale.tokenOut.decimals)).format(
                        '0,0'
                      )} - ${numeral(formatBigInt(sale.allocationMax, sale.tokenOut.decimals)).format('0,0')} ${
                        sale.tokenOut?.symbol
                      }`}
                    />
                    {isSaleClosed(sale) && (
                      <HeaderItem isMobile title="Closed On" description={timeFrame(sale.endDate)} textAlign="right" />
                    )}
                    {isSaleUpcoming(sale) && (
                      <HeaderItem
                        isMobile
                        title="Starts On"
                        description={timeFrame(sale.startDate)}
                        textAlign="right"
                      />
                    )}
                    {isSaleOpen(sale) && (
                      <HeaderItem
                        isMobile
                        title="Ends In"
                        description={secondsTohms(sale.endDate)}
                        textAlign="right"
                        saleLive={true}
                        sale={sale}
                      />
                    )}
                  </Flex>
                ) : (
                  <Flex flexDirection="row" alignItems="center" flex={1}>
                    <HeaderItem
                      title="Price"
                      description={`${formatBigInt(sale.tokenPrice, sale.tokenOut.decimals).toFixed(2)} DAI/${
                        sale.tokenOut?.symbol
                      }`}
                    />
                    <HeaderItem
                      title={isSaleClosed(sale) ? 'Amount Sold' : 'Min. - Max. Allocation'}
                      description={`${numeral(formatBigInt(sale.allocationMin)).format('0,0')} - ${numeral(
                        formatBigInt(sale.allocationMax)
                      ).format('0,0')} ${sale.tokenOut?.symbol}`}
                      flexAmount={1.5}
                    />
                    {(isSaleClosed(sale) || isSaleUpcoming(sale)) && <Flex flex={0.2} />}
                    {isSaleClosed(sale) && (
                      <HeaderItem title="Closed On" description={timeFrame(sale.endDate)} textAlign="right" />
                    )}
                    {isSaleUpcoming(sale) && (
                      <HeaderItem title="Starts On" description={timeFrame(sale.startDate)} textAlign="right" />
                    )}
                    {isSaleOpen(sale) && (
                      <HeaderItem
                        title="Ends In"
                        description={secondsTohms(sale.endDate)}
                        textAlign="right"
                        saleLive={true}
                        sale={sale}
                        flexAmount={1.3}
                      />
                    )}
                  </Flex>
                )}
              </CardBody>
              {isSaleOpen(sale) && bids && bids.length > 0 && (
                <CardBody display="flex" padding={isMobile ? '16px' : theme.space[4]} border="none">
                  <HeaderControl sale={sale} showGraph={showGraph} toggleGraph={toggleGraph} isFixed={true} />
                </CardBody>
              )}
              {isSaleClosed(sale) && (!bids || bids.length === 0) && (
                <CardBody display="flex" padding={isMobile ? '16px' : theme.space[4]} border="none">
                  <HeaderControl
                    sale={sale}
                    showGraph={showGraph}
                    toggleGraph={toggleGraph}
                    isFixed={true}
                    status={isSaleClosed(sale) ? 'closed' : 'active'}
                  />
                </CardBody>
              )}
            </Card>
            {bids && bids.length > 0 && (
              <Card mt={theme.space[4]} marginX={isMobile ? '8px' : ''} border="none">
                <CardBody
                  display="flex"
                  padding={isMobile ? '16px' : theme.space[4]}
                  border="none"
                  flexDirection="row"
                  alignItems="center"
                >
                  <CardTitle fontSize="16px" lineHeight="19px" color="#000629" fontWeight="500">
                    {t('texts.yourActivity')}
                  </CardTitle>
                  <Flex flex={1} />
                  {isSaleClosed(sale) && !isMobile && (
                    <>
                      <FormButton
                        disabled={false}
                        type="button"
                        height="40px"
                        fontWeight="500"
                        padding="0 16px"
                        fontSize="14px"
                        lineHeight="21px"
                        background="#304FFE"
                        color="#fff"
                        mr="16px"
                      >
                        Claim Tokens
                      </FormButton>
                      <FormButton
                        disabled={false}
                        type="button"
                        height="40px"
                        fontWeight="500"
                        padding="0 16px"
                        fontSize="14px"
                        lineHeight="21px"
                        background="#7B7F93"
                        color="#fff"
                      >
                        Withdraw Failed Bids
                      </FormButton>
                    </>
                  )}
                </CardBody>
                <SelfBidList sale={sale} isFixed={true} bids={bids} />
              </Card>
            )}
            <TokenFooter sale={sale} />
          </Flex>
          {isSaleOpen(sale) && !isMobile && (
            <Flex flexDirection="column" width="377px" marginLeft="24px">
              <Card border="none">
                <CardBody display="flex" borderBottom="1px dashed #DDDDE3" padding={theme.space[4]}>
                  <Flex flexDirection="row" alignItems="center" flex={1} justifyContent="space-between">
                    <HeaderItem title={`Buy ${sale.tokenOut?.symbol}`} description="" color="#000629" />
                    <FixedFormMax>{`Max. 3,500 ${sale.tokenOut?.symbol}`}</FixedFormMax>
                  </Flex>
                </CardBody>
                <CardBody display="flex" padding={theme.space[4]}>
                  <PlaceBidForm
                    onSubmit={(val: BidFormProps) => buyToken(val)}
                    sale={sale}
                    currentSettlementPrice={formatBigInt(sale.tokenPrice, sale.tokenOut.decimals)}
                    isFixed
                  />
                </CardBody>
              </Card>
            </Flex>
          )}
        </Flex>
      </Container>
      <WalletConnector
        isOpen={connectModal}
        onClose={() => setModalVisible(false)}
        metamaskImage={MetamaskImage}
        walletImage={WalletImage}
      ></WalletConnector>
      {!isMobile && <Footer />}
      {isMobile && <MobileFooter />}
    </Container>
  )
}
