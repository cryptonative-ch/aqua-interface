// External
import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'

// Layouts
import { GridListSection } from 'src/components/Grid'

// claims
import { TokenClaim } from 'src/views/Token/components/TokenClaim'

export function TokenView() {
  const { account, library, chainId } = useWeb3React()
  const { claims } = useSelector(({ claims }) => claims)

  useEffect(() => {
    if (!account || !library || !chainId) {
      return
    }
  }, [account, chainId, library])

  return (
    <GridListSection>
      {claims.map((tokens, index) =>
        tokens.amount === null ? null : <TokenClaim key={index} amount={tokens.amount} sale={tokens.sale} />
      )}
    </GridListSection>
  )
}
