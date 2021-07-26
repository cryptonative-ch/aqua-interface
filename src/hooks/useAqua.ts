import { useContext } from 'react'
import { Aqua } from '@dxdao/mesa'

// Context
import { AquaContext } from 'src/aqua'

/**
 * Gives access to the Mesa ecosystem
 * using React Context API under the hood
 * @param providerOrSigner
 * @returns
 */
export function useAqua(): Aqua {
  return useContext(AquaContext) as Aqua
}
