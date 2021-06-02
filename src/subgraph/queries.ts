import { gql } from '@apollo/client'

// Attributes: DRY principles
import { FAIR_PRICE_SALE_FIELDS, FIXED_PRICE_SALE_FIELDS, FIXED_PRICE_SALE_PURCHASE_FIELDS } from './attributes'

export const GET_ALL_SALES = gql`
  query GetAllSales {
    fixedPriceSales {
      ...fixedPriceSaleResults
    }
    fairSales {
      ...fairSaleResults
    }
  }
  ${FIXED_PRICE_SALE_FIELDS}
  ${FAIR_PRICE_SALE_FIELDS}
`

export const GET_SINGLE_SALE = gql`
  query GetSingleSale($saleId: ID!) {
    fixedPriceSale(id: $saleId) {
      ...fixedPriceSaleResults
    }
    fairSale(id: $saleId) {
      ...fairSaleResults
    }
  }
  ${FIXED_PRICE_SALE_FIELDS}
  ${FAIR_PRICE_SALE_FIELDS}
`

export const GET_FIXED_PRICE_SALE_PURCHASES_BY_SALE_ID = gql`
  query GetFixedPriceSalePurchasesBySaleId($saleId: String!) {
    fixedPriceSalePurchases(where: { sale: $saleId }) {
      ...fixedPriceSalePurchaseResults
    }
  }
  ${FIXED_PRICE_SALE_PURCHASE_FIELDS}
`

export const GET_MESA_FACTORY = gql`
  query GetMesaFactory {
    mesaFactory(id: "MesaFactory") {
      id
      saleFee
      saleCount
      feeManager
      address
      feeTo
      templateManager
      templateLauncher
      feeNumerator
    }
  }
`
