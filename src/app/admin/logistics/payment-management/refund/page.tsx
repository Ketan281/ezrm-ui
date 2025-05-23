"use client"

import type React from "react"
import { useState } from "react"
import { Box, Typography, Button, CardContent, Grid, Card } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { TableComponent, type TableRowData } from "../../../../../components/TableComponent"

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

  // Create more distinct payment data entries for the pending tab
  const paymentData: PaymentRowData[] = [
    {
      invoiceId: "#123456",
      date: "April 2, 2025, 3:45PM",
      customerName: "Robin Rosh",
      email: "Robin@gmail.com",
      status: "completed",
      orderDetails: "#",
      id: "1",
    },
  {
      invoiceId: "#123456",
      date: "April 2, 2025, 3:45PM",
      customerName: "Robin Rosh",
      email: "Robin@gmail.com",
      status: "in-process",
      orderDetails: "#",
      id: "w",
    },
  {
      invoiceId: "#123456",
      date: "April 2, 2025, 3:45PM",
      customerName: "Robin Rosh",
      email: "Robin@gmail.com",
      status: "declined",
      orderDetails: "#",
      id: "3",
    },
  {
      invoiceId: "#123456",
      date: "April 2, 2025, 3:45PM",
      customerName: "Robin Rosh",
      email: "Robin@gmail.com",
      status: "completed",
      orderDetails: "#",
      id: "4",
    },
  {
      invoiceId: "#123456",
      date: "April 2, 2025, 3:45PM",
      customerName: "Robin Rosh",
      email: "Robin@gmail.com",
      status: "in-process",
      orderDetails: "#",
      id: "5",
    },
  {
      invoiceId: "#123456",
      date: "April 2, 2025, 3:45PM",
      customerName: "Robin Rosh",
      email: "Robin@gmail.com",
      status: "completed",
      orderDetails: "#",
      id: "6",
    },
  {
      invoiceId: "#123456",
      date: "April 2, 2025, 3:45PM",
      customerName: "Robin Rosh",
      email: "Robin@gmail.com",
      status: "completed",
      orderDetails: "#",
      id: "7",
    },
  {
      invoiceId: "#123456",
      date: "April 2, 2025, 3:45PM",
      customerName: "Robin Rosh",
      email: "Robin@gmail.com",
      status: "completed",
      orderDetails: "#",
      id: "8",
    },
  {
      invoiceId: "#123456",
      date: "April 2, 2025, 3:45PM",
      customerName: "Robin Rosh",
      email: "Robin@gmail.com",
      status: "completed",
      orderDetails: "#",
      id: "9",
    },
    // Add more rows to test pagination
  {
      invoiceId: "#123456",
      date: "April 2, 2025, 3:45PM",
      customerName: "Robin Rosh",
      email: "Robin@gmail.com",
      status: "completed",
      orderDetails: "#",
      id: "10",
    },
  {
      invoiceId: "#123456",
      date: "April 2, 2025, 3:45PM",
      customerName: "Robin Rosh",
      email: "Robin@gmail.com",
      status: "completed",
      orderDetails: "#",
      id: "11",
    },
  {
      invoiceId: "#123456",
      date: "April 2, 2025, 3:45PM",
      customerName: "Robin Rosh",
      email: "Robin@gmail.com",
      status: "completed",
      orderDetails: "#",
      id: "12",
    },
  ]
  
  // Make sure to use the full length of the data
  const pendingTotalResults = paymentData.length;
 
  
  const columns: TableColumnType[] = [
    { id: "invoiceId", label: "Invoice ID", width: "12%" },
    { id: "date", label: "Date", width: "25%", align: "center" },
    { id: "customerName", label: "Customer Name", width: "20%", align: "center" },
    { id: "email", label: "Email", width: "10%", align: "center" },
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
  

  
  const handlePageChange = (page: number) => {
    setPage(page)
  }

 

  // Filter reviews based on selected tab
  const statusOptions = [
    { value: "", label: "Status" },
   { value: "Completed", label: "Completed" },
    { value: "In-process", label: "In-process" },
    { value: "Pending", label: "Pending" },
    { value: "Declined", label: "Declined" },  
  ]


 const handleRowClickPending = (row: TableRowData) => {
    router.push(`/admin/logistics/payment-management/refund/detail/${row.id}`)
  }

  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", p: 1 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
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

        {/* Tabs in separate white container */}
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
                    178+
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
                    20+
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
                    190+
                  </Typography>
                  <br />
                  Declined Requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
            <>
                     <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "#212B36",
            mt: 3,
            mb: 1,
            ml:3
          }}
        >
          Pending payments
        </Typography>
          <TableComponent
            columns={columns}
            data={paymentData.slice((page - 1) * 9, page * 9)}
            totalResults={pendingTotalResults}
            currentPage={page}
            onPageChange={handlePageChange}
            onRowClick={handleRowClickPending}
            showCheckboxes={false}
            showHeader={true}
            rowsPerPage={9}
            searchOptions={{
              value: searchTerm,
              onChange: setSearchTerm,
              placeholder: "Search Order ID",
            }}
            filterOptions={{
              value: statusFilter,
              onChange: setStatusFilter,
              options: statusOptions,
            }}
          />
          </>
    
      </Box>
    </Box>
  )
}