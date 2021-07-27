import { createContext } from 'react'
import { Aqua } from '@dxdao/aqua'

export const AquaContext = createContext<Aqua | null>(null)
