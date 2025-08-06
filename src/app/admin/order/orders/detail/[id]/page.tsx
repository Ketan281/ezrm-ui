import { OrderTrackingClient } from "./client"

// Make the page component async
export default async function OrderTrackingPage({
  params,
}: {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  console.log("Params:", params) // Debug: Log params to verify id

  if (!params.id) {
    return <div>Error: No order ID provided</div>
  }

  // Pass the id to your client component
  return <OrderTrackingClient id={params?.id} />
}
