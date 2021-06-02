/* eslint-disable @typescript-eslint/no-explicit-any */

// Externals
import axios from 'axios'

//interface
import { Sale, SaleType } from '../interfaces/Sale'
import { BidsBySaleId } from 'src/redux/bids'

// utils
import { formatDecimal } from 'src/utils/Defaults'

export const getSalesData = async (salesRequest: Promise<any>): Promise<Sale[]> => {
  const fairSale: SaleType = 'FairSale'
  const fixedPriceSale: SaleType = 'FixedPriceSale'

  const fairSales: Sale[] = (await salesRequest).fairSales

  const addFairSaleType =
    fairSales.length != 0
      ? fairSales.map((item: any) => ({
          ...item,
          tokenAmount: formatDecimal(item.tokenAmount, item.tokenOut.decimal),
          minimumBidAmount: formatDecimal(item.minimumBidAmount, item.tokenOut.decimal),
          type: fairSale,
        }))
      : []

  const fixedPriceSales: Sale[] = (await salesRequest).fixedPriceSales
  const addFixedPriceSalesType =
    fixedPriceSales.length != 0
      ? fixedPriceSales.map((item: any) => ({
          ...item,
          allocationMin: formatDecimal(item.allocationMin, item.tokenOut.decimal),
          allocationMax: formatDecimal(item.allocationMax, item.tokenOut.decimal),
          sellAmount: formatDecimal(item.sellAmount, item.tokenOut.decimal),
          tokenPrice: formatDecimal(item.tokenPrice, item.tokenOut.decimal),
          soldAmount: formatDecimal(item.soldAmount, item.tokenOut.decimal),
          minimumRaise: formatDecimal(item.minimumRaise, item.tokenOut.decimal),
          type: fixedPriceSale,
        }))
      : []

  const salesArray = [...addFairSaleType, ...addFixedPriceSalesType]
  return salesArray
}

export const selectSaletype = (id: string, sales: Sale[]): SaleType => {
  const saleType: Sale = sales.filter(item => item.id === id)[0]
  return saleType.type
}

export const generateInitialSaleData = async (
  saleBidsRequest: Promise<any>,
  saletypes: SaleType
): Promise<BidsBySaleId> => {
  let saleBids: any[]
  if (saletypes == 'FixedPriceSale') {
    saleBids = (await saleBidsRequest)[saletypes].purchases.map((item: any) => ({
      ...item,
      amount: formatDecimal(item.amount),
    }))
  } else {
    saleBids = (await saleBidsRequest)[saletypes].bids.map((item: any) => ({
      ...item,
      tokenOut: formatDecimal(item.tokenOutAmount),
      tokenIn: formatDecimal(item.tokenInAmount),
    }))
  }
  const sales: BidsBySaleId = saleBids.reduce(
    (a, x) => ({
      [x.sale.id]: {
        lastUpdated: Date.now(),
        bids: saleBids,
      },
    }),
    {}
  )
  return sales
  // [{}] --> {saleId: {lastupdated, bids[{}]}}
}

export async function subgraphCall(endpoint: string, query: string) {
  const apiCall = await axios.post(endpoint, {
    query,
  })
  return apiCall.data.data
}
