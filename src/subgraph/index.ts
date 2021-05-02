/* eslint-disable @typescript-eslint/no-explicit-any */

// Externals
import axios from 'axios'

//interface
import { Sale, saleType } from '../interfaces/Sale'
import { BidsBySaleId } from 'src/redux/BidData'

// utils
import { formatDecimal } from 'src/utils/Defaults'

export const ENDPOINT: string = process.env.REACT_APP_ENDPOINT as string
export const getSalesData = async (salesRequest: Promise<any>): Promise<Sale[]> => {
  const fairSale: saleType = 'fairSale'
  const fixedPriceSale: saleType = 'fixedPriceSale'

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
          type: fixedPriceSale,
        }))
      : []

  const salesArray = [...addFairSaleType, ...addFixedPriceSalesType]
  return salesArray
}

export const selectSaletype = (id: string, sales: Sale[]): saleType => {
  const saleType: Sale = sales.filter(item => item.id === id)[0]
  return saleType.type
}

export const generateInitialSaleData = async (
  saleBidsRequest: Promise<any>,
  saletypes: saleType
): Promise<BidsBySaleId> => {
  let saleBids: any[]
  if (saletypes == 'fixedPriceSale') {
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
        bids: saleBids,
      },
    }),
    {}
  )
  return sales
}

export async function subgraphCall(endpoint: string, query: string) {
  const apiCall = await axios.post(endpoint, {
    query,
  })
  return apiCall.data.data
}
