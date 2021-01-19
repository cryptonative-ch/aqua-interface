// External
import { EffectCallback, useEffect } from 'react'

export const useMountEffect = (fun: EffectCallback) => useEffect(fun, [])
