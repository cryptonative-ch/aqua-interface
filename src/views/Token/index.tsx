// External
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { useTranslation } from 'react-i18next'

// Layouts
import { GridListSection } from 'src/components/Grid'

// interface
import { Sale } from 'src/interfaces/Sale'

// claims
import { TokenClaim } from 'src/views/Token/components/TokenClaim'
import { useSalesQuery } from 'src/hooks/useSalesQuery'

export function TokenView() {
  const { account, library, chainId } = useWeb3React()
  const [t] = useTranslation()
  const [filteredData, setFilteredData] = useState<any[]>()
  const { sales } = useSalesQuery()

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
  }, [account, chainId, library])

  return (
    <GridListSection>
      {filteredData?.length ? (
        filteredData?.map(tokens => <TokenClaim key={tokens.id} sale={tokens} />)
      ) : (
        <h1>{t('texts.noTokens')}</h1>
      )}
    </GridListSection>
  )
}
