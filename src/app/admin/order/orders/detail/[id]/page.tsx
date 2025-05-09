"use client"

import React from "react"
import { Box, Typography, Tabs, Tab, Paper, Button, Divider, Grid, styled, Avatar } from "@mui/material"
import { LocalShipping, Receipt } from "@mui/icons-material"

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

      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: "white" }}>
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
            <Grid container spacing={2} alignItems="center">
              <Grid>
                <Avatar variant="rounded" sx={{ width: 50, height: 50, bgcolor: "#f0f0f0" }} />
              </Grid>
              <Grid>
                <Typography variant="subtitle2" fontWeight="700">
                  vitamin
                </Typography>
                <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                  T-floral ipsum
                </Typography>
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
      </Paper>

      <Grid container spacing={26} sx={{ mt: 2 }}>
        <Grid>
          <Box>
            <Typography variant="h6" fontWeight="700" color="#1a365d" sx={{ mb: 2 }}>
              Payment
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                Visa **56
              </Typography>
              <Box component="img" src="/placeholder.svg?height=30&width=80" alt="Visa" sx={{ height: 16 }} />
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

        <Grid>
          <Typography variant="h6" fontWeight="700" color="#1a365d" sx={{ mb: 2 }}>
            Order Summary
          </Typography>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                Subtotal
              </Typography>
              <Typography variant="body2" fontWeight="500" color="rgba(102, 112, 133, 1)">
                $5554
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                Discount
              </Typography>
              <Typography variant="body2" fontWeight="500" color="#4caf50">
                (20%) - $1109.40
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                Delivery
              </Typography>
              <Typography variant="body2" fontWeight="500" color="rgba(102, 112, 133, 1)">
                $0.00
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                Tax
              </Typography>
              <Typography variant="body2" fontWeight="500" color="rgba(102, 112, 133, 1)">
                +$221.88
              </Typography>
            </Box>

            <Divider sx={{ my: 1.5 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
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
    </Box>
  )
}
