// External
import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

// Layouts
import { GridListSection } from 'src/components/Grid'
import { SaleSummaryWrapper } from 'src/views/Sales'

// claims
import { TokenClaim } from 'src/views/Token/components/TokenClaim'

export function TokenView() {
  const { account, library, chainId } = useWeb3React()
  const { claims } = useSelector(({ claims }) => claims)

  const [t] = useTranslation()

  useEffect(() => {
    if (!account || !library || !chainId) {
      return
    }
  }, [account, chainId, library])

  return (
    <GridListSection>
      {claims.length ? (
        claims.map((tokens, index) =>
          tokens.amount === null ? null : (
            <SaleSummaryWrapper to={`/sales/${tokens.sale.id}`} key={index}>
              <TokenClaim key={index} amount={tokens.amount} sale={tokens.sale} />
            </SaleSummaryWrapper>
          )
        )
      ) : (
        <h1>{t('texts.noTokens')}</h1>
      )}
    </GridListSection>
  )
}
