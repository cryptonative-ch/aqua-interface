/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: tokenResults
// ====================================================

export interface tokenResults {
  __typename: "Token";
  /**
   * Token address
   */
  id: string;
  /**
   * Token name, from the smart contract ERC20.name()
   */
  name: string | null;
  /**
   * The token symbol from ERC20.symbol()
   */
  symbol: string | null;
  /**
   * The token decimals, from ERC.decimals()
   */
  decimals: any;
}
