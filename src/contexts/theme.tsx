import { useLocalStorage } from '@/hooks/use-local-storage'
import { createContext, useContext, useEffect } from 'react'
import { Theme } from '@/types'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext({} as ThemeContextValue)

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('class', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
