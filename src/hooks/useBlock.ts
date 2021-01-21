// External
import { Block, BlockTag } from '@ethersproject/providers'
import { useEffect, useState } from 'react'

// Provider
import { getInfuraProvider } from 'src/providers'

export function useBlock(blockHashOrBlockTag: string | number | Promise<BlockTag>) {
  const [block, setBlock] = useState<Block>()

  useEffect(() => {
    const interval = setInterval(async () => {
      const latestBlockNumber = await getInfuraProvider().getBlock(blockHashOrBlockTag)
      if (block !== latestBlockNumber) {
        setBlock(latestBlockNumber)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return block
}
