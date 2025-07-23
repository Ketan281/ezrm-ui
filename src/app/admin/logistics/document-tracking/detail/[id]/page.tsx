"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ShipmentComp from "../shipmentDetail"
import { useState } from "react"

export default function ShipmentsPage() {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ShipmentComp />
    </QueryClientProvider>
  )
}
