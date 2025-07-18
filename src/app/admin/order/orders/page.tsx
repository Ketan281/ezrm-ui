"use client"
import { useState } from "react"
import { Box, Typography, Alert, CircularProgress } from "@mui/material"
import { useRouter } from "next/navigation"
import { TableComponent, type TableRowData } from "../../../../components/TableComponent"
import { useOrders } from "@/api/handlers"
import Image from "next/image"

interface OrderRowData extends TableRowData {
  product: string
  orderId: string
  orderNumber: string
  status: string
  quantity: string
  customerName: string
  trackOrder: string
}

export default function OrderList() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [page, setPage] = useState(1)

  // Fetch orders data using the API
  const {
    data: ordersData,
    isLoading,
    error,
    isFetching,
  } = useOrders({
    page,
    limit: 9,
    search: searchTerm,
    status: statusFilter,
  })

  console.log("Orders Data:", ordersData)
  console.log("Orders Error:", error)

  const statusOptions = [
    { value: "", label: "Status" },
    { value: "in_stock", label: "In Stock" },
    { value: "low_stock", label: "Low Stock" },
    { value: "out_of_stock", label: "Out of Stock" },
    { value: "pending", label: "Pending" },
  ]

  interface TableColumnType {
    id: string
    label: string
    width?: string
    align?: "left" | "center" | "right"
    type?: "status" | "link" | "default"
  }

  const columns: TableColumnType[] = [
    { id: "product", label: "Product", width: "18%" },
    { id: "orderId", label: "Order Id", width: "12%" },
    { id: "orderNumber", label: "Order Number", width: "16%", align: "center" },
    { id: "status", label: "Status", width: "165", type: "status", align: "center" },
    { id: "quantity", label: "Quantity", width: "10%", align: "center" },
    { id: "customerName", label: "Location", width: "18%", align: "center" },
    {
      id: "trackOrder",
      label: "Track Order",
      width: "20%",
      type: "link",
      align: "center",
    },
  ]

  // Transform API data to table format with error handling
  const transformedData: OrderRowData[] =
    ordersData?.orders?.map((order) => {
      try {
        // Handle null product case
        const productName = order.product?.name || "Product Not Found"
        const productCategory = order.product?.category || "N/A"

        // Format location
        const location = order.location
          ? `${order.location.aisle}-${order.location.rack}-${order.location.shelf}`
          : "N/A"

        // Map inventory status to order status
        const statusMapping: Record<string, string> = {
          in_stock: "In Stock",
          low_stock: "Low Stock",
          out_of_stock: "Out of Stock",
          pending: "Pending",
        }

        return {
          id: order.id || order._id,
          product: `${productName} - ${productCategory}`,
          orderId: order.uniqueId || order._id.slice(-8),
          orderNumber: order.batchNumber || order.uniqueId || order._id.slice(-8),
          status: statusMapping[order.status] || order.status,
          quantity: order.quantity?.toString() || "0",
          customerName: location, // Using location as "customer name" since this is inventory
          trackOrder: order.uniqueId || order._id,
        }
      } catch (err) {
        console.error("Error transforming order data:", err, order)
        return {
          id: order._id || "unknown",
          product: "Error loading data",
          orderId: "N/A",
          orderNumber: "N/A",
          status: "error",
          quantity: "0",
          customerName: "N/A",
          trackOrder: "N/A",
        }
      }
    }) || []

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleRowClick = (row: TableRowData) => {
    router.push(`/admin/order/orders/detail/${row.id}`)
  }

  const handleLinkClick = (row: TableRowData) => {
    router.push(`/admin/order/orders/detail/${row.id}`)
  }

  const handleSearchChange = (searchValue: string) => {
    setSearchTerm(searchValue)
    setPage(1) // Reset to first page when searching
  }

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status)
    setPage(1) // Reset to first page when filtering
  }

  // Error message formatting
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getErrorMessage = (error: any): string => {
    if (error?.response?.data?.message) {
      return error.response.data.message
    }
    if (error?.message) {
      return error.message
    }
    return "Failed to load inventory data. Please try again."
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "#F9FAFB", minHeight: "85vh", fontFamily: "Poppins, sans-serif" }}>
      {/* Header with Back button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => router.back()}>
          <Image src="/back.png?height=13&width=13" alt="Back" width={13} height={13} />
          <Typography sx={{ ml: 1, color: "#737791", fontSize: "14px", fontFamily: "Poppins, sans-serif" }}>
            Back
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#1F2A44",
          mb: 3,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Inventory Management
      </Typography>

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {getErrorMessage(error)}
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Results Summary */}
      {ordersData && !error && (
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: "14px", color: "#737791", fontFamily: "Poppins, sans-serif" }}>
            Showing {transformedData.length} of {ordersData.total} inventory items
            {searchTerm && ` for "${searchTerm}"`}
            {statusFilter && ` with status "${statusFilter}"`}
            {isFetching && " (Loading...)"}
          </Typography>
        </Box>
      )}

      {/* Empty State */}
      {!isLoading && !error && transformedData.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography sx={{ fontSize: "16px", color: "#737791", fontFamily: "Poppins, sans-serif" }}>
            {searchTerm || statusFilter
              ? "No inventory items found matching your criteria"
              : "No inventory items available"}
          </Typography>
        </Box>
      )}

      {/* Table Component */}
      {!isLoading && !error && transformedData.length > 0 && (
        <TableComponent
          columns={columns}
          data={transformedData}
          totalResults={ordersData?.total || 0}
          currentPage={page}
          onPageChange={handlePageChange}
          onRowClick={handleRowClick}
          onLinkClick={handleLinkClick}
          showCheckboxes={false}
          showHeader={true}
          rowsPerPage={9}
          searchOptions={{
            value: searchTerm,
            onChange: handleSearchChange,
            placeholder: "Search by Product Name or Unique ID",
          }}
          filterOptions={{
            value: statusFilter,
            onChange: handleStatusFilterChange,
            options: statusOptions,
          }}
        />
      )}
    </Box>
  )
}
