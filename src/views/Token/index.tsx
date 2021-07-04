// External
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

// Redux
import { setPageTitle } from 'src/redux/page'

// Components
import { Container } from 'src/components/Container'
import { Title } from 'src/components/Title'

// Hooks
import { useSalesQuery } from 'src/hooks/useSalesQuery'

// Layouts
import { GridListSection } from 'src/components/Grid'

// interface
import { Sale } from 'src/interfaces/Sale'
import { ErrorMessage } from 'src/components/ErrorMessage'

// claims
import { TokenClaim } from 'src/views/Token/components/TokenClaim'

export function TokenView() {
  const dispatch = useDispatch()
  const { account, library, chainId } = useWeb3React()
  const [t] = useTranslation()
  const [filteredData, setFilteredData] = useState<any[]>()
  const { loading, error, sales } = useSalesQuery()

  useEffect(() => {
    if (!account || !library || !chainId) {
      return
    }

    const unixDateNow = dayjs(Date.now()).unix()
    setFilteredData(
      sales.filter(
        (element: Sale) =>
          BigNumber.from(element.soldAmount) >= BigNumber.from(element.minimumRaise) && unixDateNow >= element.endDate
      )
    )
    dispatch(setPageTitle(t('pagesTitles.tokens')))
  }, [account, chainId, library, loading])

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
            filteredData?.map(tokens => <TokenClaim key={tokens.id} sale={tokens} />)
          ) : (
            <h1>No Tokens Available to Claim</h1>
          )}
        </GridListSection>
      </Container>
    </Container>
  )
}
