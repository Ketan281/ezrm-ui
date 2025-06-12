"use client"

import type React from "react"
import { useState } from "react"
import { Box, Typography, Tabs, Tab, Button, Paper, CardContent, Grid, Card } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { styled } from "@mui/material/styles"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { TableComponent, type TableRowData } from "../../../../../components/TableComponent"
// Custom styled components
const StyledTab = styled(Tab)(({}) => ({
  textTransform: "none",
  fontWeight: 600,
  fontSize: "14px",
  minWidth: "auto",
  padding: "12px 16px",
  marginRight: "8px",
  color: "#000",
  "&.Mui-selected": {
    color: "#000",
  },
}))

const StyledTabs = styled(Tabs)(({}) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "#1976d2",
    height: "3px",
  },
  marginBottom: "0px",
}))
interface PaymentRowData extends TableRowData {
  invoiceId: string
  date: string
  customerName: string
  email: string
  phoneNumber: string
  orderDetails: string
}

interface TableColumnType {
  id: string
  label: string
  width?: string
  align?: "left" | "center" | "right"
  type?: "status" | "link" | "default"
}

export default function Payments() {
  const [tabValue, setTabValue] = useState(0)
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [page, setPage] = useState(1)
  const [completedPage, setCompletedPage] = useState(1)
  const [completedSearchTerm, setCompletedSearchTerm] = useState("")
  const [completedStatusFilter, setCompletedStatusFilter] = useState("")

  const completedPaymentData: PaymentRowData[] = [
    {
      invoiceId: "#789012",
      date: "April 1, 2025, 2:30PM",
      customerName: "John Smith",
      email: "john@example.com",
      phoneNumber: "987654321",
      orderDetails: "#",
      id: "10",
    },
    {
      invoiceId: "#789013",
      date: "April 1, 2025, 1:15PM",
      customerName: "Sarah Johnson",
      email: "sarah@example.com",
      phoneNumber: "876543219",
      orderDetails: "#",
      id: "11",
    },
    {
      invoiceId: "#789014",
      date: "March 31, 2025, 4:45PM",
      customerName: "Michael Brown",
      email: "michael@example.com",
      phoneNumber: "765432198",
      orderDetails: "#",
      id: "12",
    },
    {
      invoiceId: "#789015",
      date: "March 31, 2025, 11:20AM",
      customerName: "Emily Davis",
      email: "emily@example.com",
      phoneNumber: "654321987",
      orderDetails: "#",
      id: "13",
    },
    {
      invoiceId: "#789016",
      date: "March 30, 2025, 3:10PM",
      customerName: "David Wilson",
      email: "david@example.com",
      phoneNumber: "543219876",
      orderDetails: "#",
      id: "14",
    },
    {
      invoiceId: "#789017",
      date: "March 30, 2025, 10:05AM",
      customerName: "Jessica Taylor",
      email: "jessica@example.com",
      phoneNumber: "432198765",
      orderDetails: "#",
      id: "15",
    },
    {
      invoiceId: "#789018",
      date: "March 29, 2025, 5:30PM",
      customerName: "Daniel Martinez",
      email: "daniel@example.com",
      phoneNumber: "321987654",
      orderDetails: "#",
      id: "16",
    },
    {
      invoiceId: "#789019",
      date: "March 29, 2025, 1:45PM",
      customerName: "Jennifer Anderson",
      email: "jennifer@example.com",
      phoneNumber: "219876543",
      orderDetails: "#",
      id: "17",
    },
    {
      invoiceId: "#789020",
      date: "March 28, 2025, 9:15AM",
      customerName: "Christopher Thomas",
      email: "chris@example.com",
      phoneNumber: "198765432",
      orderDetails: "#",
      id: "18",
    },
    // Add more rows to test pagination
    {
      invoiceId: "#789021",
      date: "March 27, 2025, 2:30PM",
      customerName: "Amanda Johnson",
      email: "amanda@example.com",
      phoneNumber: "123456789",
      orderDetails: "#",
      id: "19",
    },
    {
      invoiceId: "#789022",
      date: "March 27, 2025, 1:00PM",
      customerName: "Robert Brown",
      email: "robert@example.com",
      phoneNumber: "234567891",
      orderDetails: "#",
      id: "20",
    },
  ]

  const completedColumns: TableColumnType[] = [
    { id: "invoiceId", label: "Invoice ID", width: "12%" },
    { id: "date", label: "Payment Date", width: "25%", align: "center" },
    { id: "customerName", label: "Customer Name", width: "20%", align: "center" },
    { id: "email", label: "Email", width: "10%", align: "center" },
    { id: "phoneNumber", label: "Phone Number", width: "18%", align: "center" },
    { id: "orderDetails", label: "Order Details", width: "20%", type: "link", align: "center" },
  ]
  
  // Create more distinct payment data entries for the pending tab
  const paymentData: PaymentRowData[] = [
    {
      invoiceId: "#123456",
      date: "April 2, 2025, 3:45PM",
      customerName: "Robin Rosh",
      email: "Robin@gmail.com",
      phoneNumber: "123456789",
      orderDetails: "#",
      id: "1",
    },
    {
      invoiceId: "#123457",
      date: "April 2, 2025, 2:30PM",
      customerName: "Alex Johnson",
      email: "alex@gmail.com",
      phoneNumber: "987654321",
      orderDetails: "#",
      id: "2",
    },
    {
      invoiceId: "#123458",
      date: "April 2, 2025, 1:15PM",
      customerName: "Sam Cooper",
      email: "sam@gmail.com",
      phoneNumber: "456789123",
      orderDetails: "#",
      id: "3",
    },
    {
      invoiceId: "#123459",
      date: "April 1, 2025, 4:20PM",
      customerName: "Taylor Swift",
      email: "taylor@gmail.com",
      phoneNumber: "789123456",
      orderDetails: "#",
      id: "4",
    },
    {
      invoiceId: "#123460",
      date: "April 1, 2025, 2:10PM",
      customerName: "Jordan Lee",
      email: "jordan@gmail.com",
      phoneNumber: "321654987",
      orderDetails: "#",
      id: "5",
    },
    {
      invoiceId: "#123461",
      date: "April 1, 2025, 11:45AM",
      customerName: "Casey Morgan",
      email: "casey@gmail.com",
      phoneNumber: "654987321",
      orderDetails: "#",
      id: "6",
    },
    {
      invoiceId: "#123462",
      date: "March 31, 2025, 3:30PM",
      customerName: "Riley Parker",
      email: "riley@gmail.com",
      phoneNumber: "147258369",
      orderDetails: "#",
      id: "7",
    },
    {
      invoiceId: "#123463",
      date: "March 31, 2025, 1:05PM",
      customerName: "Quinn Adams",
      email: "quinn@gmail.com",
      phoneNumber: "369258147",
      orderDetails: "#",
      id: "8",
    },
    {
      invoiceId: "#123464",
      date: "March 31, 2025, 10:50AM",
      customerName: "Morgan Bailey",
      email: "morgan@gmail.com",
      phoneNumber: "258369147",
      orderDetails: "#",
      id: "9",
    },
    // Add more rows to test pagination
    {
      invoiceId: "#123465",
      date: "March 30, 2025, 4:15PM",
      customerName: "Dakota Rivers",
      email: "dakota@gmail.com",
      phoneNumber: "963852741",
      orderDetails: "#",
      id: "10",
    },
    {
      invoiceId: "#123466",
      date: "March 30, 2025, 2:00PM",
      customerName: "Avery Smith",
      email: "avery@gmail.com",
      phoneNumber: "741852963",
      orderDetails: "#",
      id: "11",
    },
    {
      invoiceId: "#123467",
      date: "March 30, 2025, 11:30AM",
      customerName: "Jamie Wilson",
      email: "jamie@gmail.com",
      phoneNumber: "852741963",
      orderDetails: "#",
      id: "12",
    },
  ]
  
  // Make sure to use the full length of the data
  const pendingTotalResults = paymentData.length;
  const completedTotalResults = completedPaymentData.length;
  
  const columns: TableColumnType[] = [
    { id: "invoiceId", label: "Invoice ID", width: "12%" },
    { id: "date", label: "Date", width: "25%", align: "center" },
    { id: "customerName", label: "Customer Name", width: "20%", align: "center" },
    { id: "email", label: "Email", width: "10%", align: "center" },
    {
      id: "phoneNumber",
      label: "Phone Number",
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
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
  
  const handlePageChange = (page: number) => {
    setPage(page)
  }

 

  // Filter reviews based on selected tab
  const statusOptions = [
    { value: "", label: "Status" },
    { value: "New Order", label: "New Order" },
    { value: "Pending", label: "Pending" },
    { value: "In-process", label: "In-process" },
    { value: "Completed", label: "Completed" },
  ]

  const handleCompletedPageChange = (page: number) => {
    setCompletedPage(page)
  }
 const handleRowClickPending = (row: TableRowData) => {
    router.push(`/admin/logistics/payment-management/payment/detail/pending/${row.id}`)
  }
   const handleRowClickCompleted = (row: TableRowData) => {
    router.push(`/admin/logistics/payment-management/payment/detail/completed/${row.id}`)
  }
   const handleLinkClickPending = (row: TableRowData) => {
    router.push(`/admin/logistics/payment-management/payment/detail/pending/${row.id}`)
  }
   const handleLinkClickCompleted = (row: TableRowData) => {
    router.push(`/admin/logistics/payment-management/payment/detail/completed/${row.id}`)
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
          Payments/pending payments
        </Typography>

        {/* Tabs in separate white container */}
        <Paper sx={{ borderRadius: 1, overflow: "hidden", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)", mb: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "white" }}>
            <StyledTabs value={tabValue} onChange={handleTabChange} TabIndicatorProps={{ style: { height: 3 } }}>
              <StyledTab label="Pending Payments" />
              <StyledTab label="Completed Payments" />
            </StyledTabs>
          </Box>
        </Paper>
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
                  Total Invoice
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
                  Total Paid Invoices
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
                  Total unpaid Invoices
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
                <Typography variant="h6" fontSize={"11px"} sx={{ textAlign: "left" }}>
                  <Typography component="span" sx={{ fontSize: "15px", fontWeight: "bold" }}>
                    190+
                  </Typography>
                  <br />
                  Total invoices Sent
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {tabValue === 0 ? (
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
            onLinkClick={handleLinkClickPending}
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
        ) : (
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
          Completed payments
        </Typography>
          <TableComponent
            columns={completedColumns}
            data={completedPaymentData.slice((completedPage - 1) * 9, completedPage * 9)}
            totalResults={completedTotalResults}
            currentPage={completedPage}
            onPageChange={handleCompletedPageChange}
            onRowClick={handleRowClickCompleted}
            onLinkClick={handleLinkClickCompleted}
            showCheckboxes={false}
            showHeader={true}
            rowsPerPage={9}
            searchOptions={{
              value: completedSearchTerm,
              onChange: setCompletedSearchTerm,
              placeholder: "Search Order ID",
            }}
            filterOptions={{
              value: completedStatusFilter,
              onChange: setCompletedStatusFilter,
              options: statusOptions,
            }}
          />
          </>
        )}
      </Box>
    </Box>
  )
}