// External
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

// Redux
import { setPageTitle } from 'src/redux/page'

// Components
import { Container } from 'src/components/Container'
import { Title } from 'src/components/Title'

// Hooks
import { useMesa } from 'src/hooks/useMesa'

// Layouts
import { GridListSection } from 'src/components/Grid'

// interface
import { FixedPriceSalePurchase } from 'src/interfaces/Sale'
import { ErrorMessage } from 'src/components/ErrorMessage'

// claims
import { TokenClaim } from 'src/views/Token/components/TokenClaim'

// bids
import { useBids } from 'src/hooks/useBids'

const userSalesQuery = (userAddress: string) => `

query getTokenClaims {
  fixedPriceSalePurchases(where:{
    buyer:"${userAddress}"})
  {
    id
    amount
    sale {
        id
      soldAmount
      minimumRaise
      name
      status
      startDate
      endDate
      tokenPrice
      sellAmount
      tokenIn {
        id
        name
        symbol
        decimals
      }
      tokenOut {
          id
        name
        symbol
        decimals
      }
      allocationMin
      allocationMax

    }
  }
}

`

export function TokenView() {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()
  const [t] = useTranslation()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error>()
  const { totalPurchased } = useBids(saleId, 'FixedPriceSale')
  const mesa = useMesa()
  const [filteredData, setFilteredData] = useState<FixedPriceSalePurchase[] | undefined>()

  useEffect(() => {
    if (!account || !library || !chainId) {
      return
    }
    mesa.subgraph
      .query(userSalesQuery(account))
      .then(({ data }) => {
        const { fixedPriceSalePurchases } = data
        const unixDateNow = dayjs(Date.now()).unix()
        setFilteredData(
          fixedPriceSalePurchases.filter(
            (element: FixedPriceSalePurchase) =>
              BigNumber.from(element.sale?.soldAmount) >= BigNumber.from(element.sale?.minimumRaise) &&
              unixDateNow > element.sale!.endDate
          )
        )
      })
      .catch(error => {
        setError(error)
        toast.error(t('errors.fetchTokens'))
        setLoading(false)
      })
      .then(() => {
        setLoading(false)
      })
    dispatch(setPageTitle(t('pagesTitles.tokens')))
  }, [account, chainId, library])

  if (loading) {
    return (
      <Container minHeight="100vh" inner={false} noPadding={true}>
        <Container>
          <Title>{t('texts.claimTokens')}</Title>
          <GridListSection>
            <h1>Loading!</h1>
          </GridListSection>
        </Container>
      </Container>
    )
  }

  if (error) {
    return (
      <Container minHeight="100vh" inner={false} noPadding={true}>
        <Container>
          <Title>{t('texts.claimTokens')}</Title>
          <GridListSection>
            <ErrorMessage error={error} />
          </GridListSection>
        </Container>
      </Container>
    )
  }

  return (
    <Container minHeight="100vh" inner={false} noPadding={true}>
      <Container>
        <Title>{t('texts.claimTokens')}</Title>
        <GridListSection>
          {filteredData?.length ? (
            filteredData?.map(tokens => <TokenClaim key={tokens.id} purchase={tokens} />)
          ) : (
            <h1>No Tokens Available to Claim</h1>
          )}
        </GridListSection>
      </Container>
    </Container>
  )
}
