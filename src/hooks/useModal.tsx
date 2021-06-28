import { useState } from 'react'

export const useModal = (initialState = false) => {
  const [isShown, setShown] = useState<boolean>(initialState)
  
  const toggle = () => setShown(!isShown)

  return {
    isShown,
    toggle,
    setShown,
  }
}
