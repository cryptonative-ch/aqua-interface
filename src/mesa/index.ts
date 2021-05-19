import { createContext } from 'react'
import { Mesa } from '@dxdao/mesa'

export const MesaContext = createContext<Mesa | null>(null)
