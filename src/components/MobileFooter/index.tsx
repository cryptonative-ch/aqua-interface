// External
import React from 'react'

//Internal
import { Wrapper } from 'src/components/MobileFooter/style'
import { PurchaseTokensForm } from 'src/views/Sale/components/PurchaseTokensForm'
import { Sale } from 'src/interfaces/Sale'
import { isSaleOpen, isSaleClosed } from 'src/aqua/sale'
import { FIX_LATER } from 'src/interfaces'
import { ClaimButton } from 'src/views/Sale/components/HeaderClaim/button'

export interface MobileFooterProps {
  onClick?: () => void
  sale: Sale
}

export const MobileFooter: React.FC<MobileFooterProps> = ({ sale }) => {
  return (
    <Wrapper>
      {isSaleOpen(sale as FIX_LATER) ? (
        <PurchaseTokensForm saleId={sale.id} />
      ) : isSaleClosed(sale as FIX_LATER) ? (
        <ClaimButton sale={sale as FIX_LATER} />
      ) : (
        <div>Sale has not begun yet</div>
      )}
    </Wrapper>
  )
}
