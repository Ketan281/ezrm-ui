"use client"
import { useState, useMemo } from "react"
import type React from "react"
import { Box, Typography, Button, CardContent, Grid, Card, CircularProgress, Alert } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { TableComponent, type TableRowData } from "../../../../components/TableComponent"
import { useRefundTransactions } from "@/api/handlers/refundTransactionsHandler"
import type { RefundTransaction } from "@/api/services/refundTransactions"

interface PaymentRowData extends TableRowData {
  transactionId: string
  orderId: string
  date: string
  customerName: string
  amount: string
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
  const rowsPerPage = 9

  // Fetch refund transactions
  const {
    data: refundData,
    isLoading,
    error,
    isError,
  } = useRefundTransactions({
    page,
    limit: rowsPerPage,
    search: searchTerm,
    status: statusFilter,
  })

  // Transform API data to table format
  const transformedData: PaymentRowData[] = useMemo(() => {
    if (!refundData?.data?.transactions) return []

    return refundData.data.transactions.map((transaction: RefundTransaction) => ({
      id: transaction._id,
      transactionId: transaction.uniqueId,
      orderId: transaction.orderId,
      date: new Date(transaction.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      customerName: transaction.customerId, // You might want to fetch customer name separately
      amount: `₹${transaction.refundDetails.refundAmount.toLocaleString()}`,
      status: transaction.refundDetails.refundStatus,
      orderDetails: `/admin/payments/refund/detail/${transaction._id}`,
    }))
  }, [refundData])

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
    { id: "transactionId", label: "Transaction ID", width: "15%" },
    { id: "orderId", label: "Order ID", width: "12%" },
    { id: "date", label: "Date", width: "25%", align: "center" },
    { id: "customerName", label: "Customer ID", width: "15%", align: "center" },
    { id: "amount", label: "Amount", width: "12%", align: "center" },
    {
      id: "status",
      label: "Status",
      width: "15%",
      align: "center",
      type: "status",
    },
    {
      id: "orderDetails",
      label: "Order Details",
      width: "15%",
      type: "link",
      align: "center",
    },
  ]

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const statusOptions = [
    { value: "", label: "Status" },
    { value: "processed", label: "Processed" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
  ]

  const handleRowClick = (row: TableRowData) => {
    router.push(`/admin/payments/refund/detail/${row.id}`)
  }

  const handleLinkClick = (row: TableRowData) => {
    router.push(`/admin/payments/refund/detail/${row.id}`)
  }

  if (isLoading) {
    return (
      <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", p: 1 }}>
        <Alert severity="error" sx={{ mt: 2 }}>
          Error loading refund transactions: {error instanceof Error ? error.message : 'Something went wrong'}
        </Alert>
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
            ml: 3,
          }}
        >
          Refund Transactions
        </Typography>

        <TableComponent
          columns={columns}
          data={transformedData}
          totalResults={refundData?.data?.total || 0}
          currentPage={page}
          onPageChange={handlePageChange}
          onRowClick={handleRowClick}
          onLinkClick={handleLinkClick}
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
