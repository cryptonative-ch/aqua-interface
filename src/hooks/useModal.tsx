import { useState } from 'react'
import { useCookies } from 'react-cookie'

export const useModal = () => {
  const [cookies, setCookie] = useCookies(['termsofsale'])
  const [isShown, setShown] = useState<boolean>(cookies.termsofsale !== 'true')

  const toggle = (flag: boolean = false) => {
    if (flag) {
      setCookie('termsofsale', 'true', { path: '/' })
    }
    setShown(!isShown)
  }

  return {
    isShown,
    toggle,
  }
}
