// This is a Server Component
import { OrderTrackingClient } from "./client"

interface OrderTrackingPageProps {
  params: {
    id: string
  }
  searchParams?: {
    [key: string]: string | string[] | undefined
  }
}

export default function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  return <OrderTrackingClient id={params.id} />
}