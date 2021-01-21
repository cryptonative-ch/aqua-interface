// External
import { useEffect, useState } from 'react'

// Providers
import { getBlockNumber } from 'src/providers'

export function useBlockNumber() {
  const [block, setBlock] = useState(0)

  useEffect(() => {
    const interval = setInterval(async () => {
      const latestBlockNumber = await getBlockNumber()
      if (block !== latestBlockNumber) {
        setBlock(latestBlockNumber)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return block
}
