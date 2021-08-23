// External
import { useWeb3React } from '@web3-react/core'

// hooks
import { useCPK } from 'src/hooks/useCPK'

export async function useWrapNativeToken(
  tokenAddress: string,
  value: BigNumber | number | string
): Promise<TransactionResult> {
  const { account, library, chainId } = useWeb3React()

  const { cpk } = useCPK(library)

  // approve deposit into WETH/WXDAI contract
  // deposit into WETH/WXDAI contract
  // approve transfer of value from CPK contract
  // transfer value to Sale contract

  if (cpk) {
    const { transactionResponse, hash, safeTxHash } = await cpk.execTransactions([
      // approve deposit into WETH/WXDAI contract
      {
        // deposit into WETH/WXDAI contract
        to: tokenAddress,
        data: ERC20Interface.interface.functions.transfer.encode(),
        value: value,
      },
    ])
  }

  return {
    transactionResponse,
    hash,
    safeTxHash,
  }
}
