/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMesaFactory
// ====================================================

export interface GetMesaFactory_mesaFactory {
  __typename: 'MesaFactory'
  /**
   * ID: should be a unique easy-to-reference from the subgraph
   */
  id: string
  /**
   * Fee for launching a new sale
   */
  saleFee: any
  /**
   * Number of sales created via the factory
   */
  saleCount: number
  /**
   * Fee manager; CFO
   */
  feeManager: any
  /**
   * MesaFactory contract address
   */
  address: any
  /**
   * Fee Collector address: DAO/EOA/multisig
   */
  feeTo: any
  /**
   * Template manager address
   */
  templateManager: any
  /**
   * TemplateLauncher contract address
   */
  templateLauncher: any
  feeNumerator: any
}

export interface GetMesaFactory {
  mesaFactory: GetMesaFactory_mesaFactory | null
}
