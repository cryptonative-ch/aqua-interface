import { useContext } from 'react'
import { Aqua } from '@dxdao/aqua'

// Context
import { AquaContext } from 'src/aqua'

/**
 * Gives access to the Aqua ecosystem
 * using React Context API under the hood
 */
export function useAqua(): Aqua {
  return useContext(AquaContext) as Aqua
}
