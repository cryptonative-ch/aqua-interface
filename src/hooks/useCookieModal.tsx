import { useCookies } from 'react-cookie'
import { useModal } from 'src/hooks/useModal'

export const useCookieModal = (cookieName: string) => {
  const [cookies, setCookie] = useCookies([cookieName])
  const { isShown, setShown } = useModal(cookies[cookieName] !== 'true')

  const toggle = (flag = false) => {
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
