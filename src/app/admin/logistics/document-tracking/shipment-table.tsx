"use client"
import { Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material"
import { MoreVert, ArrowForward, DirectionsBoat } from "@mui/icons-material"

interface ShipmentData {
  id: number
  airShip: "air" | "ship"
  refNo: string
  tracking: string
  invoicePo: string
  supplier: string
  origin: string
  destination: string
  etd: string
  eta: string
  shippingStatus: string
  clearanceStatus: string
}

const sampleData: ShipmentData[] = [
  {
    id: 1,
    airShip: "ship",
    refNo: "810",
    tracking: "-",
    invoicePo: "-",
    supplier: "-",
    origin: "-",
    destination: "CHEMIKART INDIA",
    etd: "-",
    eta: "-",
    shippingStatus: "-",
    clearanceStatus: "-",
  },
]

export default function ShipmentTable() {
  return (
    <Box
      sx={{
        width: "60%",
        mt: 3,
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          border: "1px solid #e1e5e9",
          borderRadius: "8px",
          backgroundColor: "white",
          // Force scrollbar to always be visible
          "&::-webkit-scrollbar": {
            height: "12px",
            display: "block !important",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "#a8a8a8",
            },
          },
          // For Firefox
          scrollbarWidth: "thin",
          scrollbarColor: "#c1c1c1 #f1f1f1",
        }}
      >
        <Table
          sx={{
            minWidth: "1600px", // Force a larger minimum width to ensure scrolling
            width: "max-content",
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#f8f9fa",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: "16px 12px",
                  borderBottom: "1px solid #e1e5e9",
                  width: 120,
                  whiteSpace: "nowrap",
                }}
              >
                AIR/SHIP
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#f8f9fa",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: "16px 12px",
                  borderBottom: "1px solid #e1e5e9",
                  width: 120,
                  whiteSpace: "nowrap",
                }}
              >
                REF NO
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#f8f9fa",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: "16px 12px",
                  borderBottom: "1px solid #e1e5e9",
                  width: 140,
                  whiteSpace: "nowrap",
                }}
              >
                TRACKING
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#f8f9fa",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: "16px 12px",
                  borderBottom: "1px solid #e1e5e9",
                  width: 150,
                  whiteSpace: "nowrap",
                }}
              >
                INVOICE/PO
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#f8f9fa",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: "16px 12px",
                  borderBottom: "1px solid #e1e5e9",
                  width: 140,
                  whiteSpace: "nowrap",
                }}
              >
                SUPPLIER
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#f8f9fa",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: "16px 12px",
                  borderBottom: "1px solid #e1e5e9",
                  width: 120,
                  whiteSpace: "nowrap",
                }}
              >
                ORIGIN
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#f8f9fa",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: "16px 12px",
                  borderBottom: "1px solid #e1e5e9",
                  width: 180,
                  whiteSpace: "nowrap",
                }}
              >
                DESTINATION
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#f8f9fa",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: "16px 12px",
                  borderBottom: "1px solid #e1e5e9",
                  width: 100,
                  whiteSpace: "nowrap",
                }}
              >
                ETD
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#f8f9fa",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: "16px 12px",
                  borderBottom: "1px solid #e1e5e9",
                  width: 100,
                  whiteSpace: "nowrap",
                }}
              >
                ETA
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#f8f9fa",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: "16px 12px",
                  borderBottom: "1px solid #e1e5e9",
                  width: 170,
                  whiteSpace: "nowrap",
                }}
              >
                SHIPPING STATUS
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#f8f9fa",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: "16px 12px",
                  borderBottom: "1px solid #e1e5e9",
                  width: 180,
                  whiteSpace: "nowrap",
                }}
              >
                CLEARANCE STATUS
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#f8f9fa",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: "16px 12px",
                  borderBottom: "1px solid #e1e5e9",
                  width: 120,
                  whiteSpace: "nowrap",
                }}
              >
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f8f9fa",
                  },
                }}
              >
                <TableCell
                  sx={{
                    padding: "16px 12px",
                    borderBottom: "1px solid #e1e5e9",
                    whiteSpace: "nowrap",
                    width: 120,
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#e8f4f8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DirectionsBoat sx={{ fontSize: 16, color: "#4a90a4" }} />
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#333",
                    padding: "16px 12px",
                    borderBottom: "1px solid #e1e5e9",
                    whiteSpace: "nowrap",
                    width: 120,
                  }}
                >
                  {row.refNo}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#666",
                    padding: "16px 12px",
                    borderBottom: "1px solid #e1e5e9",
                    whiteSpace: "nowrap",
                    width: 140,
                  }}
                >
                  {row.tracking}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#666",
                    padding: "16px 12px",
                    borderBottom: "1px solid #e1e5e9",
                    whiteSpace: "nowrap",
                    width: 150,
                  }}
                >
                  {row.invoicePo}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#666",
                    padding: "16px 12px",
                    borderBottom: "1px solid #e1e5e9",
                    whiteSpace: "nowrap",
                    width: 140,
                  }}
                >
                  {row.supplier}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#666",
                    padding: "16px 12px",
                    borderBottom: "1px solid #e1e5e9",
                    whiteSpace: "nowrap",
                    width: 120,
                  }}
                >
                  {row.origin}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#999",
                    padding: "16px 12px",
                    borderBottom: "1px solid #e1e5e9",
                    whiteSpace: "nowrap",
                    width: 180,
                  }}
                >
                  {row.destination}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#666",
                    padding: "16px 12px",
                    borderBottom: "1px solid #e1e5e9",
                    whiteSpace: "nowrap",
                    width: 100,
                  }}
                >
                  {row.etd}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#666",
                    padding: "16px 12px",
                    borderBottom: "1px solid #e1e5e9",
                    whiteSpace: "nowrap",
                    width: 100,
                  }}
                >
                  {row.eta}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#666",
                    padding: "16px 12px",
                    borderBottom: "1px solid #e1e5e9",
                    whiteSpace: "nowrap",
                    width: 170,
                  }}
                >
                  {row.shippingStatus}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#666",
                    padding: "16px 12px",
                    borderBottom: "1px solid #e1e5e9",
                    whiteSpace: "nowrap",
                    width: 180,
                  }}
                >
                  {row.clearanceStatus}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "16px 12px",
                    borderBottom: "1px solid #e1e5e9",
                    whiteSpace: "nowrap",
                    width: 120,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      size="small"
                      sx={{
                        color: "#666",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        },
                      }}
                    >
                      <MoreVert sx={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: "#FF8C42",
                        color: "white",
                        width: 28,
                        height: 28,
                        "&:hover": {
                          backgroundColor: "#E67A35",
                        },
                      }}
                    >
                      <ArrowForward sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  )
}
