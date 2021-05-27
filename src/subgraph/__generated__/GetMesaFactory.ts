/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMesaFactory
// ====================================================

export interface GetMesaFactory_mesaFactory {
  __typename: 'MesaFactory'
  id: string
  saleFee: any
  saleCount: number
  feeManager: any
  address: any
  feeTo: any
  templateManager: any
  templateLauncher: any
  feeNumerator: any
}

export interface GetMesaFactory {
  mesaFactory: GetMesaFactory_mesaFactory | null
}
