import { useContext } from 'react'
import { Mesa } from '@dxdao/mesa'

// Context
import { MesaContext } from 'src/mesa'

/**
 * Gives access to the Mesa ecosystem
 * using React Context API under the hood
 * @param providerOrSigner
 * @returns
 */
export function useMesa(): Mesa {
  const mesaContext = useContext(MesaContext)
  return mesaContext as Mesa
}
