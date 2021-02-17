import { useState } from 'react'

export const useGenericModal = () => {
  const [isShown, setShown] = useState<boolean>(false)
  const toggle = () => setShown(!isShown)
  return {
    isShown,
    toggle,
    setShown,
  }
}
