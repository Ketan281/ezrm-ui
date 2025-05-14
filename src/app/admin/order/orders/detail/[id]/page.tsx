// First, check what type of props OrderTrackingClient expects
import { OrderTrackingClient } from "./client";

// src/app/admin/order/orders/detail/[id]/page.tsx
interface OrderTrackingPageProps {
  params: {
    id: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export default function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  console.log("Params:", params); // Debug: Log params to verify id
  if (!params.id) {
    return <div>Error: No order ID provided</div>;
  }
  
  // Make sure the id is passed as the expected type (likely string)
  return <OrderTrackingClient id={params.id} />;
}