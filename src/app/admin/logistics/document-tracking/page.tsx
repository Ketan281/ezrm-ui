"use client"

import React from "react"
import { Box, Typography, Button, Select, MenuItem, FormControl, IconButton, Container } from "@mui/material"
import { ArrowBack, KeyboardArrowDown, Refresh } from "@mui/icons-material"
import type { SelectChangeEvent } from "@mui/material/Select"
import Image from "next/image"
export default function ShipmentHeader() {
  const [filterValue, setFilterValue] = React.useState("All")
  const [dateSort, setDateSort] = React.useState("Date Added")

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterValue(event.target.value)
  }

  const handleDateSortChange = (event: SelectChangeEvent) => {
    setDateSort(event.target.value)
  }

  return (
    <Container maxWidth={false} sx={{ px: 3, py: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

        {/* Third Row - Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Left Section - Dropdowns and Reset */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* All dropdown */}
            <Box
             sx={{
                  minWidth: 100,
                  height: 40,
                  fontSize: "14px",
                  color: "#333",
                  backgroundColor: "white",
                  border: "1px solid #e1e5e9",
                  borderRadius: "20px",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  gap:2
                  }}>
                <Image src="/ship.png" alt="ERMM Logo" width={20} height={15} />
                <Image src="/air.png" alt="ERMM Logo" width={20} height={15} />
            </Box>
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

          {/* Right Section - Add Shipment button */}
          <Button
            variant="contained"
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
    </Container>
  )
}
