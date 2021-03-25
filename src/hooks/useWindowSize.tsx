import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
}

interface UseWindowSizeReturn {
  windowSize: WindowSize
  isMobile: boolean
}

// Hook
export function useWindowSize(): UseWindowSizeReturn {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.outerWidth,
    height: window.outerHeight,
  })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.outerWidth,
        height: window.outerHeight,
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return {
    windowSize,
    isMobile: windowSize.width <= 640,
  }
}
