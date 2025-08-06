/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { Box, Typography, Button, CardContent, Grid, Card, CircularProgress, Alert } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { TableComponent, type TableRowData } from "../../../../../components/TableComponent"
import { useSupplierRefundTransactions } from "@/api/handlers/supplierRefundTransactionsHandler"
import type { SupplierRefundTransaction } from "@/api/services/supplierRefundTransactions"

interface PaymentRowData extends TableRowData {
  invoiceId: string
  date: string
  customerName: string
  email: string
  status: string
  orderDetails: string
}

interface TableColumnType {
  id: string
  label: string
  width?: string
  align?: "left" | "center" | "right"
  type?: "status" | "link" | "default"
}

export default function Refunds() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [page, setPage] = useState(1)
  const [isClient, setIsClient] = useState(false)
  const rowsPerPage = 9

  // Fix hydration mismatch by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Fetch supplier refund transactions
  const {
    data: refundData,
    isLoading,
    error,
    isError,
  } = useSupplierRefundTransactions({
    page,
    limit: rowsPerPage,
    search: searchTerm,
    status: statusFilter,
  })

  // Helper function to format date consistently
  const formatDate = (dateString: string): string => {
    if (!isClient) return '' // Return empty string during SSR
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch (error) {
      return dateString
    }
  }

  // Helper function to map API status to display status
  const getStatusForDisplay = (apiStatus: string): string => {
    switch (apiStatus.toLowerCase()) {
      case 'processed':
        return 'completed'
      case 'pending':
        return 'in-process'
      case 'failed':
        return 'declined'
      default:
        return apiStatus.toLowerCase()
    }
  }

  // Transform API data to table format
  const transformedData: PaymentRowData[] = useMemo(() => {
    if (!refundData?.data?.transactions || !isClient) return []

    return refundData.data.transactions.map((transaction: SupplierRefundTransaction) => ({
      id: transaction._id,
      invoiceId: transaction.uniqueId,
      date: formatDate(transaction.createdAt),
      customerName: transaction.customerId,
      email: `₹${transaction.refundDetails.refundAmount.toLocaleString()}`,
      status: getStatusForDisplay(transaction.refundDetails.refundStatus),
      orderDetails: `/admin/logistics/payment-management/refund/detail/${transaction._id}`,
    }))
  }, [refundData, isClient])

  // Calculate statistics
  const statistics = useMemo(() => {
    if (!refundData?.data?.transactions) {
      return {
        total: 0,
        approved: 0,
        declined: 0,
      }
    }

    const transactions = refundData.data.transactions
    const total = refundData.data.total
    const approved = transactions.filter(t => t.refundDetails.refundStatus === 'processed').length
    const declined = transactions.filter(t => t.refundDetails.refundStatus === 'failed').length

    return { total, approved, declined }
  }, [refundData])

  const columns: TableColumnType[] = [
    { id: "invoiceId", label: "Transaction ID", width: "12%" },
    { id: "date", label: "Date", width: "25%", align: "center" },
    { id: "customerName", label: "Customer ID", width: "20%", align: "center" },
    { id: "email", label: "Amount", width: "10%", align: "center" },
    {
      id: "status",
      label: "Status",
      width: "18%",
      align: "center",
    },
    {
      id: "orderDetails",
      label: "Order Details",
      width: "20%",
      type: "link",
      align: "center",
    },
  ]

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  // Filter options based on API status values
  const statusOptions = [
    { value: "", label: "Status" },
    { value: "processed", label: "Completed" },
    { value: "pending", label: "In-process" },
    { value: "failed", label: "Declined" },
  ]

  const handleRowClickPending = (row: TableRowData) => {
    router.push(`/admin/logistics/payment-management/refund/detail/${row.id}`)
  }

  const handleLinkClickPending = (row: TableRowData) => {
    router.push(`/admin/logistics/payment-management/refund/detail/${row.id}`)
  }

  // Show loading during hydration
  if (!isClient) {
    return (
      <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  // Error state
  if (isError) {
    return (
      <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", p: 1 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Alert severity="error" sx={{ mt: 2 }}>
            Error loading refund transactions: {error instanceof Error ? error.message : 'Something went wrong'}
          </Alert>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", p: 1 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{
            color: "#637381",
            textTransform: "none",
            fontWeight: 500,
            mb: 1,
            mt: -2,
            "&:hover": {
              backgroundColor: "transparent",
              color: "#212B36",
            },
          }}
        >
          Back
        </Button>

        {/* Page title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#212B36",
            mb: 3,
          }}
        >
          Refund Requests
        </Typography>

        {/* Statistics Cards */}
        <Grid container spacing={3} mt={1} mb={1}>
          <Grid display={"flex"} justifyContent={"space-around"} width={"100%"}>
            <Card
              sx={{
                backgroundColor: "#fff",
                textAlign: "center",
                p: 1,
                width: "216px",
                height: "96px",
                borderRadius: "10px",
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                <Box
                  height={50}
                  width={50}
                  borderRadius={"50px"}
                  sx={{ backgroundColor: "rgba(91, 147, 255, 0.1)", display: "grid", placeItems: "center" }}
                >
                  <Image src="/Heart.png" alt="Products" width={20} height={20} />
                </Box>
                <Typography variant="h6" fontSize={"11px"} sx={{ textAlign: "left" }}>
                  <Typography component="span" sx={{ fontSize: "15px", fontWeight: "bold" }}>
                    {statistics.total}+
                  </Typography>
                  <br />
                  Total Requests
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                backgroundColor: "#fff",
                textAlign: "center",
                p: 1,
                width: "216px",
                height: "96px",
                borderRadius: "10px",
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                <Box
                  height={50}
                  width={50}
                  borderRadius={"50px"}
                  sx={{ backgroundColor: "rgba(255, 214, 107, 0.1)", display: "grid", placeItems: "center" }}
                >
                  <Image src="/Game.png" alt="Products" width={20} height={20} />
                </Box>
                <Typography variant="h6" fontSize={"11px"} sx={{ textAlign: "left" }}>
                  <Typography component="span" sx={{ fontSize: "15px", fontWeight: "bold" }}>
                    {statistics.approved}+
                  </Typography>
                  <br />
                  Approved Requests
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                backgroundColor: "#fff",
                textAlign: "center",
                p: 1,
                width: "216px",
                height: "96px",
                borderRadius: "10px",
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                <Box
                  height={50}
                  width={50}
                  borderRadius={"50px"}
                  sx={{ backgroundColor: "rgba(255, 143, 107, 0.1)", display: "grid", placeItems: "center" }}
                >
                  <Image src="/Bag.png" alt="Products" width={20} height={20} />
                </Box>
                <Typography variant="h6" fontSize={"10.5px"} sx={{ textAlign: "left" }}>
                  <Typography component="span" sx={{ fontSize: "15px", fontWeight: "bold" }}>
                    {statistics.declined}+
                  </Typography>
                  <br />
                  Declined Requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Table Section */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "#212B36",
            mt: 3,
            mb: 1,
            ml: 3
          }}
        >
          Supplier Refund Transactions
        </Typography>

        <TableComponent
          columns={columns}
          data={transformedData}
          totalResults={refundData?.data?.total || 0}
          currentPage={page}
          onPageChange={handlePageChange}
          onRowClick={handleRowClickPending}
          onLinkClick={handleLinkClickPending}
          showCheckboxes={false}
          showHeader={true}
          rowsPerPage={rowsPerPage}
          searchOptions={{
            value: searchTerm,
            onChange: setSearchTerm,
            placeholder: "Search Transaction ID or Order ID",
          }}
          filterOptions={{
            value: statusFilter,
            onChange: setStatusFilter,
            options: statusOptions,
          }}
        />
      </Box>
    </Box>
  )
}
