// External
import { useEffect, useState } from 'react'

// Hooks
import { useSales } from './useSales'

// Interfaces
import { Sale } from 'src/interfaces/Sale'

interface UseSaleReturn {
  loading: boolean
  error: Error | null
  sale: Sale | null
}

/**
 *
 * @param saleId
 */
export function useSale(saleId: string): UseSaleReturn {
  /**
   * @todo refactor this function
   * function puts another request to the server
   */
  const { sales } = useSales()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [sale, setSales] = useState<Sale | null>(null)

  useEffect(() => {
    try {
      const foundSale = sales.find(sale => sale.id === saleId)

      // Sale == null = not found
      if (foundSale) {
        setSales(foundSale)
      }
    } catch (e) {
      setError(e)
    }
    setLoading(false)
  }, [sales, saleId])

  return {
    sale,
    loading,
    error,
  }
}
