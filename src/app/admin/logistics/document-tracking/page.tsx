"use client"

import type React from "react"
import { useState, useCallback } from "react"
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Container,
  Dialog,
  DialogContent,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
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
import {
  ArrowBack,
  KeyboardArrowDown,
  Refresh,
  Close,
  ImportExport,
  FileDownload,
  DirectionsBoat,
  Flight,
  CloudUpload,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material"
import type { SelectChangeEvent } from "@mui/material/Select"
import Image from "next/image"

const FILTER_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Completed", label: "Completed" },
] as const

const DATE_SORT_OPTIONS = [
  { value: "Date Modified", label: "Date Modified" },
  { value: "Name", label: "Name" },
] as const

const HBL_TRACKER_OPTIONS = [
  { value: "Track1", label: "Track 1" },
  { value: "Track2", label: "Track 2" },
] as const

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

// Types
type ImportExportType = "import" | "export"
type TransportModeType = "sea" | "air"

interface FormData {
  refNumber: string
  poNumber: string
  mblNumber: string
  containerNumber: string
  hblNumber: string
  hblTracker: string
}

// Custom hooks
const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    refNumber: "",
    poNumber: "",
    mblNumber: "",
    containerNumber: "",
    hblNumber: "",
    hblTracker: "",
  })

  const updateFormField = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData({
      refNumber: "",
      poNumber: "",
      mblNumber: "",
      containerNumber: "",
      hblNumber: "",
      hblTracker: "",
    })
  }, [])

  return { formData, updateFormField, resetForm }
}

// Styled components
const StyledSelect = ({
  value,
  onChange,
  placeholder,
  options,
  disabled = false,
}: {
  value: string
  onChange: (event: SelectChangeEvent) => void
  placeholder: string
  options: readonly { value: string; label: string }[]
  disabled?: boolean
}) => (
  <FormControl size="small">
    <Select
      value={value}
      onChange={onChange}
      displayEmpty
      disabled={disabled}
      renderValue={(val) => (val === "" ? placeholder : val)}
      sx={{
        minWidth: 160,
        height: 40,
        fontSize: "14px",
        color: "#333",
        backgroundColor: "white",
        border: "1px solid #e1e5e9",
        borderRadius: "20px",
        fontFamily: "Poppins, sans-serif",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiSelect-select": {
          py: 1,
          px: 1.5,
          fontFamily: "Poppins, sans-serif",
        },
        "&:hover": {
          backgroundColor: "#f8f9fa",
        },
        "&.Mui-focused": {
          backgroundColor: "white",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
      }}
      IconComponent={KeyboardArrowDown}
    >
      <MenuItem value="" disabled sx={{ fontFamily: "Poppins, sans-serif" }}>
        {placeholder}
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value} sx={{ fontFamily: "Poppins, sans-serif" }}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

const TransportIcons = () => (
  <Box
    sx={{
      minWidth: 100,
      height: 40,
      fontSize: "14px",
      color: "#333",
      backgroundColor: "white",
      border: "1px solid #e1e5e9",
      borderRadius: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
      padding: "0 16px",
      position: "relative",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Image
        src="/ship.png"
        alt="Ship Icon"
        width={20}
        height={15}
        style={{
          objectFit: "contain",
          display: "block",
        }}
      />
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Image
        src="/air.png"
        alt="Air Icon"
        width={20}
        height={15}
        style={{
          objectFit: "contain",
          display: "block",
        }}
      />
    </Box>
  </Box>
)

const FormField = ({
  label,
  value,
  onChange,
  type = "text",
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: "text" | "select"
  options?: readonly { value: string; label: string }[]
}) => (
  <Box sx={{ flex: 1 }}>
    <Typography
      variant="body2"
      sx={{
        fontFamily: "Poppins, sans-serif",
        fontSize: "14px",
        color: "#666",
        mb: 1,
      }}
    >
      {label}
    </Typography>
    {type === "select" && options ? (
      <FormControl fullWidth size="small">
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty
          renderValue={(val) => (val === "" ? `Select ${label}` : val)}
          sx={{
            borderRadius: "8px",
            fontFamily: "Poppins, sans-serif",
            backgroundColor: "white",
          }}
        >
          <MenuItem value="" disabled sx={{ fontFamily: "Poppins, sans-serif" }}>
            Select {label}
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value} sx={{ fontFamily: "Poppins, sans-serif" }}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ) : (
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            fontFamily: "Poppins, sans-serif",
            backgroundColor: "white",
          },
        }}
      />
    )}
  </Box>
)

const ToggleSection = ({
  title,
  value,
  onChange,
  options,
}: {
  title: string
  value: string
  onChange: (event: React.MouseEvent<HTMLElement>, newValue: string | null) => void
  options: Array<{
    value: string
    label: string
    icon: React.ReactNode
  }>
}) => (
  <Box
    sx={{
      flex: 1,
      backgroundColor: "#f5f5f5",
      borderRadius: "12px",
      p: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
    }}
  >
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={onChange}
      orientation="horizontal"
      sx={{
        gap: 2,
        "& .MuiToggleButtonGroup-grouped": {
          border: "none",
          borderRadius: "25px !important",
          px: 3,
          py: 1,
          fontFamily: "Poppins, sans-serif",
          textTransform: "none",
          fontSize: "14px",
          fontWeight: 500,
          minWidth: 120,
          height: 40,
          backgroundColor: "white",
          color: "#666",
          "&:hover": {
            backgroundColor: "#f8f9fa",
          },
        },
      }}
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: value === option.value ? "#FF8C42" : "#e8e8e8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& svg": {
                fontSize: 14,
                color: value === option.value ? "white" : "#666",
              },
            }}
          >
            {option.icon}
          </Box>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  </Box>
)

const FileUploadArea = () => (
  <Box sx={{ flex: 1 }}>
    <Box
      sx={{
        border: "2px dashed #ccc",
        borderRadius: "12px",
        p: 4,
        textAlign: "center",
        backgroundColor: "#fafafa",
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f5f5f5",
          borderColor: "#FF8C42",
        },
      }}
    >
      <CloudUpload sx={{ fontSize: 48, color: "#999" }} />
      <Typography
        variant="body1"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "16px",
          color: "#666",
          fontWeight: 500,
        }}
      >
        Drop Items here or{" "}
        <Typography
          component="span"
          sx={{
            color: "#FF8C42",
            textDecoration: "underline",
            cursor: "pointer",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Browse Files
        </Typography>
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "12px",
          color: "#999",
        }}
      >
        You can Upload pdf, xsl, doc, png, jpg, jpeg files
      </Typography>
    </Box>
  </Box>
)

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

const ShipmentTable = () => {
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
                  minWidth: 140,
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

// Main component
export default function ShipmentComp() {
  // State management
  const [filterValue, setFilterValue] = useState("")
  const [dateSort, setDateSort] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [importExport, setImportExport] = useState<ImportExportType | "">("")
  const [transportMode, setTransportMode] = useState<TransportModeType | "">("")

  const { formData, updateFormField, resetForm } = useFormData()

  // Event handlers
  const handleFilterChange = useCallback((event: SelectChangeEvent) => {
    setFilterValue(event.target.value)
  }, [])

  const handleDateSortChange = useCallback((event: SelectChangeEvent) => {
    setDateSort(event.target.value)
  }, [])

  const handleImportExportChange = useCallback((event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null) {
      setImportExport(newValue as ImportExportType)
    }
  }, [])

  const handleTransportModeChange = useCallback((event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null) {
      setTransportMode(newValue as TransportModeType)
    }
  }, [])

  const handleReset = useCallback(() => {
    setFilterValue("")
    setDateSort("")
  }, [])

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false)
    setImportExport("")
    setTransportMode("")
    resetForm()
  }, [resetForm])

  // Computed values
  const bothOptionsSelected = Boolean(importExport && transportMode)

  return (
    <>
      <Container maxWidth={false} sx={{ px: 3, py: 2 }}>
        {/* Header Section */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
          {/* Back Button */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              sx={{
                p: 0.5,
                color: "#666",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <ArrowBack sx={{ fontSize: 20 }} />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                color: "#666",
                ml: 0.5,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              back
            </Typography>
          </Box>

          {/* Page Title */}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                fontSize: "24px",
                color: "#333",
                lineHeight: 1.2,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Tracking & Documentation
            </Typography>
          </Box>

          {/* Controls Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 0,
              flexWrap: "wrap",
              "@media (max-width: 768px)": {
                justifyContent: "center",
              },
            }}
          >
            {/* Filters and Buttons */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                flexWrap: "wrap",
                "@media (max-width: 768px)": {
                  justifyContent: "center",
                },
              }}
            >
              <TransportIcons />

              <StyledSelect
                value={filterValue}
                onChange={handleFilterChange}
                placeholder="All"
                options={FILTER_OPTIONS}
              />

              <StyledSelect
                value={dateSort}
                onChange={handleDateSortChange}
                placeholder="Date Added"
                options={DATE_SORT_OPTIONS}
              />

              <Button
                startIcon={<Refresh sx={{ fontSize: 16 }} />}
                onClick={handleReset}
                sx={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: 400,
                  textTransform: "none",
                  minWidth: "auto",
                  px: 2,
                  py: 1,
                  height: 40,
                  fontFamily: "Poppins, sans-serif",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Reset
              </Button>

              <Button
                variant="contained"
                onClick={handleModalOpen}
                sx={{
                  backgroundColor: "#FF8C42",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 3,
                  py: 1.25,
                  height: 40,
                  ml:15,
                  boxShadow: "none",
                  fontFamily: "Poppins, sans-serif",
                  minWidth: "140px",
                  maxWidth: "200px",
                  "&:hover": {
                    backgroundColor: "#E67A35",
                    boxShadow: "none",
                  },
                }}
              >
                Add Shipment
              </Button>
            </Box>
          </Box>

          {/* Shipment Table */}
          <ShipmentTable />
        </Box>
      </Container>

      {/* Add Shipment Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: "24px",
            minHeight: bothOptionsSelected ? "600px" : "350px",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {/* Modal Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "24px",
                color: "#FF8C42",
              }}
            >
              Add Shipment
            </Typography>
            <IconButton
              onClick={handleModalClose}
              sx={{
                color: "#666",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Toggle Sections */}
          <Box sx={{ display: "flex", gap: 4, mb: 4 }}>
            <ToggleSection
              title="Import/Export"
              value={importExport}
              onChange={handleImportExportChange}
              options={[
                { value: "import", label: "Import", icon: <ImportExport /> },
                { value: "export", label: "Export", icon: <FileDownload /> },
              ]}
            />

            <ToggleSection
              title="Transport Mode"
              value={transportMode}
              onChange={handleTransportModeChange}
              options={[
                { value: "sea", label: "Sea", icon: <DirectionsBoat /> },
                { value: "air", label: "Air", icon: <Flight /> },
              ]}
            />
          </Box>

          {/* Conditional Content */}
          {bothOptionsSelected ? (
            <Box sx={{ display: "flex", gap: 4 }}>
              {/* Form Section */}
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "#f5f5f5",
                  borderRadius: "12px",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Box sx={{ display: "flex", gap: 3 }}>
                  <FormField
                    label="Ref Number"
                    value={formData.refNumber}
                    onChange={(value) => updateFormField("refNumber", value)}
                  />
                  <FormField
                    label="PO Number"
                    value={formData.poNumber}
                    onChange={(value) => updateFormField("poNumber", value)}
                  />
                </Box>

                <Box sx={{ display: "flex", gap: 3 }}>
                  <FormField
                    label="MBL Number"
                    value={formData.mblNumber}
                    onChange={(value) => updateFormField("mblNumber", value)}
                  />
                  <FormField
                    label="Container Number"
                    value={formData.containerNumber}
                    onChange={(value) => updateFormField("containerNumber", value)}
                  />
                </Box>

                <Box sx={{ display: "flex", gap: 3 }}>
                  <FormField
                    label="HBL Number"
                    value={formData.hblNumber}
                    onChange={(value) => updateFormField("hblNumber", value)}
                  />
                  <FormField
                    label="HBL Tracker"
                    value={formData.hblTracker}
                    onChange={(value) => updateFormField("hblTracker", value)}
                    type="select"
                    options={HBL_TRACKER_OPTIONS}
                  />
                </Box>
              </Box>

              {/* File Upload Section */}
              <FileUploadArea />
            </Box>
          ) : (
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "12px",
                p: 3,
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "14px",
                  color: "#666",
                  lineHeight: 1.5,
                }}
              >
                Please Select Import/Export and Sea/Air shipment to add shipment
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
