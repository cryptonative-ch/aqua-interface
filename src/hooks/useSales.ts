// External
import { useEffect, useState } from 'react'

// Interfaces
import { Sale } from 'src/interfaces/Sale'

interface UseSalesReturn {
  loading: boolean
  error: Error | null
  sales: Sale[]
}

export function useSales(): UseSalesReturn {
  const [loading, setLoading] = useState<boolean>(true)
  const [error] = useState<Error | null>(null)
  const [sales, setSales] = useState<Sale[]>([])

  useEffect(() => {
    // Populate with fake data
    // startDate and endDate assumes that there are 6000 blocks per 24 hours interval
    // push data once
    setSales(sales)

    setLoading(false)
  }, [sales])

  return {
    error,
    loading,
    sales,
  }
}
