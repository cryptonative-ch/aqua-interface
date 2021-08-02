/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAquaFactory
// ====================================================

export interface GetAquaFactory_aquaFactory {
  __typename: 'AquaFactory'
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
   * AquaFactory contract address
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
  templateLauncher: any | null
  feeNumerator: any
}

export interface GetAquaFactory {
  aquaFactory: GetAquaFactory_aquaFactory | null
}
