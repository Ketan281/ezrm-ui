"use client"

import React from "react"
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
} from "@mui/icons-material"
import type { SelectChangeEvent } from "@mui/material/Select"
import Image from "next/image"
import ShipmentTable from "./shipment-table"

export default function ShipmentHeader() {
  const [filterValue, setFilterValue] = React.useState("All")
  const [dateSort, setDateSort] = React.useState("Date Added")
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [importExport, setImportExport] = React.useState<string>("import")
  const [transportMode, setTransportMode] = React.useState<string>("")
  const [hblTracker, setHblTracker] = React.useState<string>("")

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterValue(event.target.value)
  }

  const handleDateSortChange = (event: SelectChangeEvent) => {
    setDateSort(event.target.value)
  }

  const handleImportExportChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null) {
      setImportExport(newValue)
    }
  }

  const handleTransportModeChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null) {
      setTransportMode(newValue)
    }
  }

  const handleHblTrackerChange = (event: SelectChangeEvent) => {
    setHblTracker(event.target.value)
  }

  const bothOptionsSelected = importExport && transportMode

  return (
    <>
      <Container sx={{ px: 3, py: 2,width:"80%" }}>
        {/* Header Section - Full Width */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
          {/* First Row - Back button */}
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

          {/* Second Row - Heading */}
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
              Tacking & Documentation
            </Typography>
          </Box>

          {/* Third Row - Controls - Responsive Layout */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
              flexWrap: "wrap",
              justifyContent: "space-between",
              "@media (max-width: 768px)": {
                flexDirection: "column",
                alignItems: "stretch",
                gap: 2,
              },
            }}
          >
            {/* Left Section - Dropdowns and Reset */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                "@media (max-width: 768px)": {
                  justifyContent: "center",
                  width: "100%",
                },
              }}
            >
              {/* Ship/Air Icons Box */}
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

              {/* All dropdown */}
              <FormControl size="small">
                <Select
                  value=""
                  onChange={handleFilterChange}
                  displayEmpty
                  renderValue={(value) => (value === "" ? "All" : value)}
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
                    All
                  </MenuItem>
                  <MenuItem value="Active" sx={{ fontFamily: "Poppins, sans-serif" }}>
                    Active
                  </MenuItem>
                  <MenuItem value="Completed" sx={{ fontFamily: "Poppins, sans-serif" }}>
                    Completed
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Date Added dropdown */}
              <FormControl size="small">
                <Select
                  value=""
                  onChange={handleDateSortChange}
                  displayEmpty
                  renderValue={(value) => (value === "" ? "Date Added" : value)}
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
                    Date Added
                  </MenuItem>
                  <MenuItem value="Date Modified" sx={{ fontFamily: "Poppins, sans-serif" }}>
                    Date Modified
                  </MenuItem>
                  <MenuItem value="Name" sx={{ fontFamily: "Poppins, sans-serif" }}>
                    Name
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Reset button */}
              <Button
                startIcon={<Refresh sx={{ fontSize: 16 }} />}
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
            </Box>

            {/* Right Section - Add Shipment button - Fixed Responsive positioning */}
            <Box
              sx={{
                display: "flex",
                "@media (max-width: 768px)": {
                  justifyContent: "center",
                  width: "100%",
                },
                "@media (min-width: 769px)": {
                  justifyContent: "flex-end",
                  flex: "0 0 auto", // Prevent it from growing
                },
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  console.log("Add Shipment button clicked!")
                  setIsModalOpen(true)
                }}
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
        </Box>

        {/* Table Section - 60% Width, Independent of Header */}
        <ShipmentTable />
      </Container>

      {/* Add Shipment Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
          {/* Header */}
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
              onClick={() => setIsModalOpen(false)}
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

          {/* Horizontal Container for both grey boxes */}
          <Box sx={{ display: "flex", gap: 4, mb: 4 }}>
            {/* Import/Export Grey Box */}
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
                value={importExport}
                exclusive
                onChange={handleImportExportChange}
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
                <ToggleButton value="import" sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: importExport === "import" ? "#FF8C42" : "#e8e8e8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ImportExport sx={{ fontSize: 14, color: importExport === "import" ? "white" : "#666" }} />
                  </Box>
                  Import
                </ToggleButton>
                <ToggleButton value="export" sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: importExport === "export" ? "#FF8C42" : "#e8e8e8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FileDownload sx={{ fontSize: 14, color: importExport === "export" ? "white" : "#666" }} />
                  </Box>
                  Export
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Sea/Air Grey Box */}
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
                value={transportMode}
                exclusive
                onChange={handleTransportModeChange}
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
                <ToggleButton value="sea" sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: transportMode === "sea" ? "#FF8C42" : "#e8e8e8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DirectionsBoat sx={{ fontSize: 14, color: transportMode === "sea" ? "white" : "#666" }} />
                  </Box>
                  Sea
                </ToggleButton>
                <ToggleButton value="air" sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: transportMode === "air" ? "#FF8C42" : "#e8e8e8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Flight sx={{ fontSize: 14, color: transportMode === "air" ? "white" : "#666" }} />
                  </Box>
                  Air
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          {/* Conditional Content */}
          {bothOptionsSelected ? (
            /* Form Fields when both options are selected */
            <Box sx={{ display: "flex", gap: 4 }}>
              {/* Left Form Section */}
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
                {/* First Row */}
                <Box sx={{ display: "flex", gap: 3 }}>
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
                      Ref Number
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          fontFamily: "Poppins, sans-serif",
                          backgroundColor: "white",
                        },
                      }}
                    />
                  </Box>
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
                      PO Number
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          fontFamily: "Poppins, sans-serif",
                          backgroundColor: "white",
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Second Row */}
                <Box sx={{ display: "flex", gap: 3 }}>
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
                      MBL Number
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          fontFamily: "Poppins, sans-serif",
                          backgroundColor: "white",
                        },
                      }}
                    />
                  </Box>
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
                      Container Number
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          fontFamily: "Poppins, sans-serif",
                          backgroundColor: "white",
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Third Row */}
                <Box sx={{ display: "flex", gap: 3 }}>
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
                      HBL Number
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          fontFamily: "Poppins, sans-serif",
                          backgroundColor: "white",
                        },
                      }}
                    />
                  </Box>
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
                      HBL Tracker
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        value={hblTracker}
                        onChange={handleHblTrackerChange}
                        displayEmpty
                        renderValue={(value) => (value === "" ? "Select HBL Track" : value)}
                        sx={{
                          borderRadius: "8px",
                          fontFamily: "Poppins, sans-serif",
                          backgroundColor: "white",
                        }}
                      >
                        <MenuItem value="" disabled sx={{ fontFamily: "Poppins, sans-serif" }}>
                          Select HBL Track
                        </MenuItem>
                        <MenuItem value="Track1" sx={{ fontFamily: "Poppins, sans-serif" }}>
                          Track 1
                        </MenuItem>
                        <MenuItem value="Track2" sx={{ fontFamily: "Poppins, sans-serif" }}>
                          Track 2
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>

              {/* Right File Upload Section */}
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
            </Box>
          ) : (
            /* Instruction Text when options are not selected */
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