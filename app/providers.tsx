'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // forcedTheme={undefined} permite a troca, mas defaultTheme define o início
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  )
}