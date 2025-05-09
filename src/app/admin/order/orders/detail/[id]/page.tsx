"use client"

import React from "react"
import { Box, Typography, Tabs, Tab, Paper, Button, Divider, Grid, styled, Avatar, Rating } from "@mui/material"
import { LocalShipping, Receipt, NoteAlt } from "@mui/icons-material"
import { TableColumn, TableRowData,TableComponent } from '../../../../../../components/TableComponent';
// Custom styled components
const StyledTab = styled(Tab)({
  textTransform: "none",
  fontWeight: 600,
  fontSize: "14px",
  minWidth: "unset",
  padding: "12px 16px",
  "&.Mui-selected": {
    color: "#000000",
    fontWeight: 700,
  },
})

// Use a prop that won't be passed to the DOM
const StatusDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive" && prop !== "isCompleted",
})<{ isActive?: boolean; isCompleted?: boolean }>(({ isActive, isCompleted }) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: isActive ? "#f5a623" : isCompleted ? "#667085" : "#e0e0e0",
  border: isCompleted || isActive ? "none" : "2px solid #e0e0e0",
}))

interface OrderTrackingProps {
  orderId?: string // Make orderId optional with a default value in the component
}

export default function OrderTracking({ orderId = "3354654" }: OrderTrackingProps) {
  const [tabValue, setTabValue] = React.useState(1) // Set to 1 for Customer Information tab to be active

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Custom styles for the tabs indicator (the line under the active tab)
  const tabsStyles = {
    "& .MuiTabs-indicator": {
      backgroundColor: tabValue === 0 ? "#1a365d" : "#000000",
      height: tabValue === 0 ? "3px" : "2px",
    }
  }
  // Add this inside your OrderTracking component, before the return statement
  const orderColumns: TableColumn[] = [
    { id: 'order', label: 'Order', width: '25%' },
    { id: 'date', label: 'Date', width: '25%' },
    { id: 'status', label: 'Order Status', width: '25%', align: 'center', type: 'status' },
    { id: 'price', label: 'Price', width: '25%', align: 'right' },
  ];

  const orderData: TableRowData[] = [
    {
      id: '1',
      order: '#23534D',
      date: 'May 25, 3:12 PM',
      status: 'Pending',
      price: '$29.74'
    },
    {
      id: '2',
      order: '#125128',
      date: 'May 10, 2:00 PM',
      status: 'Completed',
      price: '$23.06'
    },
    {
      id: '3',
      order: '#23534D',
      date: 'April 18, 8:00 AM',
      status: 'Completed',
      price: '$29.74'
    },
    {
      id: '4',
      order: '#76543E',
      date: 'April 12, 6:00 AM',
      status: 'Completed',
      price: '$23.06'
    },
    {
      id: '5',
      order: '#51323C',
      date: 'April 10, 4:12 PM',
      status: 'Completed',
      price: '$23.06'
    },
  ];
  return (
    <Box sx={{ maxWidth: 950, margin: "0 auto", p: 3, bgcolor: "#f9fafb" }}>
      <Typography variant="h5" fontWeight="700" color="#1a365d" gutterBottom>
        Track The Order
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="order tracking tabs"
          sx={tabsStyles}
        >
          <StyledTab label="Order Details" />
          <StyledTab label="Customer Information" />
        </Tabs>
      </Box>

      {tabValue === 0 ? (
        // Order Details Tab Content
        <>
          <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid>
                <Box>
                  <Typography variant="subtitle1" fontWeight="700" color="#1a365d">
                    Order ID: {orderId}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                    <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                      Order date:
                    </Typography>
                    <Typography variant="body2" fontWeight="500">
                      Feb 16, 2022 |
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <LocalShipping sx={{ color: "#4caf50", fontSize: 18, mr: 1 }} />
                      <Typography variant="body2" color="#4caf50" fontWeight="500">
                        Estimated delivery: May 16, 2022
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<Receipt />}
                  sx={{
                    borderColor: "#e0e0e0",
                    color: "#424242",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { borderColor: "#bdbdbd" },
                  }}
                >
                  Invoice
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#f5a623",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#e69c1f" },
                  }}
                >
                  Track order
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={0} sx={{ p: 3, mb: 0, borderRadius: 2, bgcolor: "transparent" }}>
            <Box sx={{ position: "relative", width: "100%", mb: 4, px: 2 }}>
              {/* Progress lines */}
              <Box
                sx={{
                  position: "absolute",
                  top: "6px",
                  left: "calc(12.5% + 6px)",
                  right: "calc(12.5% + 6px)",
                  height: "1px",
                  zIndex: 0,
                }}
              >
                {/* First segment - completed halfway (dark) */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    width: "16.67%", // Half of the first segment (33.33% / 2)
                    height: "1px",
                    backgroundColor: "#667085",
                  }}
                />

                {/* Rest of the line - incomplete (light) */}
                <Box
                  sx={{
                    position: "absolute",
                    left: "16.67%",
                    right: 0,
                    height: "1px",
                    backgroundColor: "#e0e0e0",
                  }}
                />
              </Box>

              {/* Status dots and labels */}
              <Box sx={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "25%" }}>
                  <StatusDot isActive={true} />
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 1,
                      textAlign: "center",
                      fontWeight: 500,
                      color: "#f5a623",
                      fontSize: "12px",
                    }}
                  >
                    Order Confirmed
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(102, 112, 133, 1)", textAlign: "center", fontSize: "11px" }}
                  >
                    Wed, 11th Jan
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "25%" }}>
                  <StatusDot />
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 1,
                      textAlign: "center",
                      fontWeight: 500,
                      color: "#667085",
                      fontSize: "12px",
                    }}
                  >
                    Shipped
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(102, 112, 133, 1)", textAlign: "center", fontSize: "11px" }}
                  >
                    Wed, 11th Jan
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "25%" }}>
                  <StatusDot />
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 1,
                      textAlign: "center",
                      fontWeight: 500,
                      color: "#667085",
                      fontSize: "12px",
                    }}
                  >
                    Out For Delivery
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(102, 112, 133, 1)", textAlign: "center", fontSize: "11px" }}
                  >
                    Wed, 11th Jan
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "25%" }}>
                  <StatusDot />
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 1,
                      textAlign: "center",
                      fontWeight: 500,
                      color: "#667085",
                      fontSize: "12px",
                    }}
                  >
                    Delivered
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(102, 112, 133, 1)", textAlign: "center", fontSize: "11px" }}
                  >
                    Expected by, Mon 16th
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          <Typography variant="h6" fontWeight="700" color="#1a365d" sx={{ mb: 2 }}>
            Items Ordered
          </Typography>

          <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            {[1, 2].map((item, index) => (
              <React.Fragment key={index}>
                <Grid container spacing={28} alignItems="center">
                  <Grid display={"flex"} alignItems={"center"} gap={3}>
                    <Avatar variant="rounded" sx={{ width: 50, height: 50, bgcolor: "#f0f0f0" }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="700">
                        vitamin
                      </Typography>
                      <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                        T-floral ipsum
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid>
                    <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                      Qty: 234
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle2" fontWeight="700">
                      $1234.89
                    </Typography>
                  </Grid>
                </Grid>
                {index < 1 && <Divider sx={{ my: 2 }} />}
              </React.Fragment>
            ))}
            <Grid container spacing={14} sx={{ mt: 5 }}>
              <Grid>
                <Box>
                  <Typography variant="h6" fontWeight="700" color="#1a365d" sx={{ mb: 2 }}>
                    Payment
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                      Visa **56
                    </Typography>
                    <Box component="img" src="/visa.png?height=30&width=80" alt="Visa" sx={{ height: 16 }} />
                  </Box>
                </Box>
              </Grid>

              <Grid>
                <Box>
                  <Typography variant="h6" fontWeight="700" color="#1a365d" sx={{ mb: 2 }}>
                    Delivery
                  </Typography>
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                    Address
                  </Typography>
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                    847 Jewess Bridge Apt. 174
                  </Typography>
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                    London, UK 474-769-3919
                  </Typography>
                </Box>
              </Grid>

              <Grid width={"35%"}>
                <Typography variant="h6" fontWeight="700" color="#1a365d" sx={{ mb: 2 }}>
                  Order Summary
                </Typography>
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                      Subtotal
                    </Typography>
                    <Typography variant="body2" fontWeight="500" color="rgba(102, 112, 133, 1)">
                      $5554
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                      Discount
                    </Typography>
                    <Typography variant="body2" fontWeight="500" color="#4caf50">
                      (20%) - $1109.40
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                      Delivery
                    </Typography>
                    <Typography variant="body2" fontWeight="500" color="rgba(102, 112, 133, 1)">
                      $0.00
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                      Tax
                    </Typography>
                    <Typography variant="body2" fontWeight="500" color="rgba(102, 112, 133, 1)">
                      +$221.88
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="700" color="rgba(102, 112, 133, 1)">
                      Total
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="700" color="rgba(102, 112, 133, 1)">
                      $4666.48
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </>
      ) : (
        // Customer Information Tab Content
        <>
          <Grid container spacing={13} >
            <Grid>
              <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, width: "120%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Avatar sx={{ bgcolor: "#E2E8F0", color: "#1a365d", width: 56, height: 56, fontSize: "24px" }}>
                    R
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="700" color="#1a365d">
                      Randhir Kumar
                    </Typography>
                    <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                      India
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                        5 Orders
                      </Typography>
                      <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                        •
                      </Typography>
                      <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                        Customer for 2 years
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ ml: "auto" }}>
                    <Rating name="read-only" value={5} readOnly size="small" />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" fontWeight="700" color="#1a365d" sx={{ mb: 2 }}>
                    Customer Notes
                  </Typography>
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)" sx={{ mb: 1 }}>
                    Notes
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderColor: "#e0e0e0",
                      borderRadius: 1,
                      color: "rgba(102, 112, 133, 0.7)",
                      minHeight: "80px"
                    }}
                  >
                    Add notes about customer
                  </Paper>
                </Box>
              </Paper>
            </Grid>

            <Grid>
              <Paper elevation={0} sx={{ p: 3, mb: 2, borderRadius: 2, width: "150%", ml: 5 }}>
                <Typography variant="subtitle2" fontWeight="700" color="#1a365d" sx={{ mb: 3 }}>
                  Overview
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)" sx={{ mb: 0.5 }}>
                    Address
                  </Typography>
                  <Typography variant="body2" fontWeight="500" color="#1a365d">
                    Panapur langa
                  </Typography>
                  <Typography variant="body2" fontWeight="500" color="#1a365d">
                    Hajipur,vaishali
                  </Typography>
                  <Typography variant="body2" fontWeight="500" color="#1a365d">
                    844124
                  </Typography>
                  <Typography variant="body2" fontWeight="500" color="#1a365d">
                    India
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)" sx={{ mb: 0.5 }}>
                    Email Address
                  </Typography>
                  <Typography variant="body2" fontWeight="500" color="#1a365d">
                    randhirpal@gmail.com
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)" sx={{ mb: 0 }}>
                    Phone
                  </Typography>
                  <Typography variant="body2" fontWeight="500" color="#1a365d">
                    +91 8504789764
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid mt={-10} width={"80%"}>
              <Box >
                <Typography variant="h6" fontWeight="700" color="#1a365d" sx={{ mb: 2 }}>
                  Customer Orders
                </Typography>
                <TableComponent
                  columns={orderColumns}
                  data={orderData}
                  totalResults={orderData.length}
                  showCheckboxes={false}
                  showHeader={true}
                  rowsPerPage={10}
                />
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  )
}