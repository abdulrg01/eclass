import { ThemeProvider } from 'next-themes'
import * as React from 'react'

export default function themeProvider({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}

