// External
import { QueryResult, useQuery } from '@apollo/client'

// Query
import { GET_FIXED_PRICE_SALE_COMMITMENTS_ALL } from 'src/subgraph/queries'

// Interfaces
import {
  GetFixedPriceSaleCommitmentsByUser,
  GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments,
} from 'src/subgraph/__generated__/GetFixedPriceSaleCommitmentsByUser'

interface UseSalesQueryResult extends Omit<QueryResult, 'data'> {
  purchases: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments[]
}

/**
 * Fetches all sales from the subgraph
 * @returns A list of `Sale`
 */
export function useFixedPriceSaleCommitmentsQuery(saleId: string): UseSalesQueryResult {
  const { data, ...rest } = useQuery<GetFixedPriceSaleCommitmentsByUser>(GET_FIXED_PRICE_SALE_COMMITMENTS_ALL)

  // Default value
  let purchases: GetFixedPriceSaleCommitmentsByUser_fixedPriceSaleCommitments[] = []

  // Flatten the data
  if (data) {
    purchases = data.fixedPriceSaleCommitments.filter(commitment => commitment.sale.id === saleId)
  }

  return {
    purchases,
    ...rest,
  }
}
