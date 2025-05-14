// This is a Server Component
import { OrderTrackingClient } from "./client"

// Define proper types for the params and searchParams
interface OrderTrackingPageProps {
  params: {
    id: string
  }
  searchParams: Record<string, string | string[] | undefined>
}

export default function OrderTrackingPage({ params, searchParams }: OrderTrackingPageProps) {
  // Server components can directly use params
  return <OrderTrackingClient id={params.id} searchParams={searchParams} />
}
