"use client"

import type React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import EmotionCache from "./EmotionCache"

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <EmotionCache>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </EmotionCache>
  )
}
