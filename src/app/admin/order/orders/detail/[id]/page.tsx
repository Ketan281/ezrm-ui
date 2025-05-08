"use client"

import React from "react"
import { Box, Typography, Tabs, Tab, Paper, Button, Divider, Grid, styled, Avatar } from "@mui/material"
import { LocalShipping, Receipt, CheckCircle } from "@mui/icons-material"

// Custom styled components
const StyledTab = styled(Tab)({
  textTransform: "none",
  fontWeight: 600,
  fontSize: "14px",
  minWidth: "unset",
  padding: "12px 16px",
  "&.Mui-selected": {
    color: "#1a365d",
    fontWeight: 700,
  },
})

// Use a prop that won't be passed to the DOM
const StatusCircle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ isActive }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: isActive ? "#4caf50" : "#e0e0e0",
  color: isActive ? "white" : "#757575",
}))

const StatusLine = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ isActive }) => ({
  height: 2,
  backgroundColor: isActive ? "#4caf50" : "#e0e0e0",
  flex: 1,
}))

interface OrderTrackingProps {
  orderId?: string; // Make orderId optional with a default value in the component
}

export default function OrderTracking({ orderId = "3354654" }: OrderTrackingProps) {
  const [tabValue, setTabValue] = React.useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ maxWidth: 950, margin: "0 auto", p: 3, bgcolor: "#f9fafb" }}>
      <Typography variant="h5" fontWeight="700" color="#1a365d" gutterBottom>
        Track The Order
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="order tracking tabs">
          <StyledTab label="Order Details" />
          <StyledTab label="Customer Information" />
        </Tabs>
      </Box>

      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={25} alignItems="center">
          <Grid>
            <Box>
              <Typography variant="subtitle1" fontWeight="700" color="#1a365d">
                Order ID: {orderId}
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                <Typography variant="body2" color="text.secondary">
                  Order date:
                </Typography>
                <Typography variant="body2" fontWeight="500">
                  Feb 16, 2022 |
                </Typography>
                <Box display="flex" alignItems="center" mt={0}>
              <LocalShipping sx={{ color: "#4caf50", fontSize: 18, mr: 1 }} />
              <Typography variant="body2" color="#4caf50" fontWeight="500">
                Estimated delivery: May 16, 2022
              </Typography>
            </Box>
              </Box>
           
            </Box>

          </Grid>
          <Grid
            sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 1 }}
            mt={2}
          >
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

      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%", mb: 4, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20%" }}>
            <StatusCircle isActive={true}>
              <CheckCircle fontSize="small" />
            </StatusCircle>
            <Typography variant="caption" sx={{ mt: 1, textAlign: "center", fontWeight: 500 }}>
              Order Confirmed
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", textAlign: "center" }}>
              Wed, 11th Jan
            </Typography>
          </Box>

          <Box sx={{ height: 2, backgroundColor: "#4caf50", width: "15%" }} />

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20%" }}>
            <StatusCircle isActive={true}>
              <CheckCircle fontSize="small" />
            </StatusCircle>
            <Typography variant="caption" sx={{ mt: 1, textAlign: "center", fontWeight: 500 }}>
              Shipped
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", textAlign: "center" }}>
              Wed, 11th Jan
            </Typography>
          </Box>

          <Box sx={{ height: 2, backgroundColor: "#4caf50", width: "15%" }} />

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20%" }}>
            <StatusCircle isActive={true}>
              <CheckCircle fontSize="small" />
            </StatusCircle>
            <Typography variant="caption" sx={{ mt: 1, textAlign: "center", fontWeight: 500 }}>
              Out For Delivery
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", textAlign: "center" }}>
              Wed, 11th Jan
            </Typography>
          </Box>

          <Box sx={{ height: 2, backgroundColor: "#e0e0e0", width: "15%" }} />

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20%" }}>
            <StatusCircle isActive={false}>
              <CheckCircle fontSize="small" />
            </StatusCircle>
            <Typography variant="caption" sx={{ mt: 1, textAlign: "center", fontWeight: 500 }}>
              Delivered
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", textAlign: "center" }}>
              Expected by, Mon 16th
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Typography variant="h6" fontWeight="700" color="#1a365d" sx={{ mb: 2 }}>
        Items Ordered
      </Typography>

      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        {[1, 2].map((item, index) => (
          <React.Fragment key={index}>
            <Grid container spacing={2} alignItems="center">
              <Grid>
                <Avatar variant="rounded" sx={{ width: 50, height: 50, bgcolor: "#f0f0f0" }} />
              </Grid>
              <Grid>
                <Typography variant="subtitle2" fontWeight="700">
                  vitamin
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  T-floral ipsum
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body2" color="text.secondary">
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
      </Paper>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid>
          <Box>
            <Typography variant="h6" fontWeight="700" color="#1a365d" sx={{ mb: 2 }}>
              Payment
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2"color="#1a365d" >Visa **56</Typography>
              <Box
                component="img"
                src="/api/placeholder/80/30" // Replaced external image with placeholder
                alt="Visa"
                sx={{ height: 16 }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid>
          <Box>
            <Typography variant="h6" fontWeight="700" color="#1a365d" sx={{ mb: 2 }}>
              Delivery
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address
            </Typography>
            <Typography variant="body2">847 Jewess Bridge Apt. 174</Typography>
            <Typography variant="body2">London, UK 474-769-3919</Typography>
          </Box>
        </Grid>

        <Grid>
          <Typography variant="h6" fontWeight="700" color="#1a365d" sx={{ mb: 2 }}>
            Order Summary
          </Typography>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2" fontWeight="500">
                $5554
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Discount
              </Typography>
              <Typography variant="body2" fontWeight="500" color="#4caf50">
                (20%) - $1109.40
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Delivery
              </Typography>
              <Typography variant="body2" fontWeight="500">
                $0.00
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Tax
              </Typography>
              <Typography variant="body2" fontWeight="500">
                +$221.88
              </Typography>
            </Box>

            <Divider sx={{ my: 1.5 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle2" fontWeight="700">
                Total
              </Typography>
              <Typography variant="subtitle2" fontWeight="700">
                $4666.48
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}