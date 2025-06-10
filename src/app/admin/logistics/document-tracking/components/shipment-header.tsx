"use client"
import { Box, Typography, Button, Select, MenuItem, FormControl, IconButton } from "@mui/material"
import { ArrowBack, KeyboardArrowDown, Refresh } from "@mui/icons-material"
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

interface ShipmentHeaderProps {
  filterValue: string
  dateSort: string
  onFilterChange: (event: SelectChangeEvent) => void
  onDateSortChange: (event: SelectChangeEvent) => void
  onReset: () => void
  onAddShipment: () => void
}

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
        src="/ship.png?height=15&width=20"
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
        src="/air.png?height=15&width=20"
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

export default function ShipmentHeader({
  filterValue,
  dateSort,
  onFilterChange,
  onDateSortChange,
  onReset,
  onAddShipment,
}: ShipmentHeaderProps) {
  return (
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

          <StyledSelect value={filterValue} onChange={onFilterChange} placeholder="All" options={FILTER_OPTIONS} />

          <StyledSelect
            value={dateSort}
            onChange={onDateSortChange}
            placeholder="Date Added"
            options={DATE_SORT_OPTIONS}
          />

          <Button
            startIcon={<Refresh sx={{ fontSize: 16 }} />}
            onClick={onReset}
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
            onClick={onAddShipment}
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
              ml: 15,
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
  )
}
