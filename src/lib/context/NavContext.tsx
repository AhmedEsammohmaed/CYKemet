'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface NavContextValue {
  title: string
  setTitle: (title: string) => void
  backHref: string | null
  setBackHref: (href: string | null) => void
}

const NavContext = createContext<NavContextValue>({
  title: 'Dashboard',
  setTitle: () => {},
  backHref: null,
  setBackHref: () => {},
})

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitleState] = useState('Dashboard')
  const [backHref, setBackHrefState] = useState<string | null>(null)

  const setTitle = useCallback((t: string) => {
    setTitleState(t)
  }, [])

  const setBackHref = useCallback((href: string | null) => {
    setBackHrefState(href)
  }, [])

  return (
    <NavContext.Provider value={{ title, setTitle, backHref, setBackHref }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  return useContext(NavContext)
}
