// External
import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

// Layouts
import { GridListSection } from 'src/components/Grid'

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
        claims.map((tokens, index) => <TokenClaim key={index} sale={tokens.sale} />)
      ) : (
        <h1>{t('texts.noTokens')}</h1>
      )}
    </GridListSection>
  )
}
