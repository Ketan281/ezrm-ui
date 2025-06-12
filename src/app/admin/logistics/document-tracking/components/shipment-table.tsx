"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
} from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"

// Sample data for the table
const SHIPMENT_DATA = [
  {
    id: 1,
    airline: "Emirates",
    airlineLogo: "/placeholder.svg?height=32&width=32",
    refNo: "810",
    tracking: "EK-2024-001",
    invoicePo: "INV-2024-001",
    supplier: "Global Suppliers Ltd",
    origin: "Dubai (DXB)",
    destination: "New York (JFK)",
    etd: "2024-01-15",
    eta: "2024-01-16",
    shippingStatus: "In Transit",
  },
  {
    id: 2,
    airline: "Qatar Airways",
    airlineLogo: "/placeholder.svg?height=32&width=32",
    refNo: "811",
    tracking: "QR-2024-002",
    invoicePo: "INV-2024-002",
    supplier: "Tech Components Inc",
    origin: "Doha (DOH)",
    destination: "London (LHR)",
    etd: "2024-01-16",
    eta: "2024-01-17",
    shippingStatus: "Delivered",
  },
  {
    id: 3,
    airline: "Singapore Airlines",
    airlineLogo: "/placeholder.svg?height=32&width=32",
    refNo: "812",
    tracking: "SQ-2024-003",
    invoicePo: "INV-2024-003",
    supplier: "Asian Manufacturing Co",
    origin: "Singapore (SIN)",
    destination: "Los Angeles (LAX)",
    etd: "2024-01-17",
    eta: "2024-01-18",
    shippingStatus: "Pending",
  },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return { backgroundColor: "#e8f5e8", color: "#2e7d32" }
    case "in transit":
      return { backgroundColor: "#fff3e0", color: "#f57c00" }
    case "pending":
      return { backgroundColor: "#fce4ec", color: "#c2185b" }
    default:
      return { backgroundColor: "#f5f5f5", color: "#666" }
  }
}

export default function ShipmentTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 1 // Since we only have sample data

  return (
    <Box sx={{ mt: 1 }}>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          border: "1px solid #e1e5e9",
          borderRadius: "12px",
          overflow: "auto",
          maxWidth: "80%",
        }}
      >
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
              <TableCell
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  py: 2,
                  minWidth: 120,
                }}
              >
                AIRLINE
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  py: 2,
                  minWidth: 80,
                }}
              >
                REF NO
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  py: 2,
                  minWidth: 120,
                }}
              >
                TRACKING
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  py: 2,
                  minWidth: 120,
                }}
              >
                INVOICE/PO
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  py: 2,
                  minWidth: 150,
                }}
              >
                SUPPLIER
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  py: 2,
                  minWidth: 120,
                }}
              >
                ORIGIN
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  py: 2,
                  minWidth: 120,
                }}
              >
                DESTINATION
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  py: 2,
                  minWidth: 100,
                }}
              >
                ETD
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  py: 2,
                  minWidth: 100,
                }}
              >
                ETA
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  py: 2,
                  minWidth: 180,
                }}
              >
                SHIPPING STATUS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SHIPMENT_DATA.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f8f9fa",
                  },
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <TableCell sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar src={row.airlineLogo} alt={row.airline} sx={{ width: 32, height: 32 }} />
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "14px",
                        color: "#333",
                        fontWeight: 500,
                      }}
                    >
                      {row.airline}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      color: "#333",
                      fontWeight: 600,
                    }}
                  >
                    {row.refNo}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {row.tracking}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {row.invoicePo}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {row.supplier}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {row.origin}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {row.destination}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {row.etd}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {row.eta}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Chip
                    label={row.shippingStatus}
                    size="small"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "12px",
                      fontWeight: 500,
                      borderRadius: "16px",
                      ...getStatusColor(row.shippingStatus),
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 2,
          gap: 1,
        }}
      >
        <IconButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          sx={{
            width: 32,
            height: 32,
            backgroundColor: "#f8f9fa",
            "&:hover": {
              backgroundColor: "#e9ecef",
            },
            "&.Mui-disabled": {
              backgroundColor: "#f8f9fa",
              opacity: 0.5,
            },
          }}
        >
          <ChevronLeft sx={{ fontSize: 18 }} />
        </IconButton>

        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "#FF8C42",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              color: "white",
              fontWeight: 500,
            }}
          >
            {currentPage}
          </Typography>
        </Box>
        <IconButton
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          sx={{
            width: 32,
            height: 32,
            backgroundColor: "#f8f9fa",
            "&:hover": {
              backgroundColor: "#e9ecef",
            },
            "&.Mui-disabled": {
              backgroundColor: "#f8f9fa",
              opacity: 0.5,
            },
          }}
        >
          <ChevronRight sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  )
}
