// External
import { InfuraProvider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'

// Constants
import { INFURA_API_KEY } from 'src/constants'

export function useBlockNumber() {
  const [block, setBlock] = useState(0)
  const infura = new InfuraProvider('homestead', INFURA_API_KEY)

  useEffect(() => {
    const interval = setInterval(async () => {
      const latestBlockNumber = await infura.getBlockNumber()
      if (block !== latestBlockNumber) {
        setBlock(latestBlockNumber)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return block
}
