"use client"

import { useState, useCallback } from "react"
import { Container, Box, Button } from "@mui/material"
import type { SelectChangeEvent } from "@mui/material/Select"
import ShipmentHeader from "./components/shipment-header"
import ShipmentTable from "./components/shipment-table"
import AddShipmentDialog from "./components/add-shipment-dialog"

const ShipmentComp = () => {
  const [filterValue, setFilterValue] = useState("")
  const [dateSort, setDateSort] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const handleFilterChange = useCallback((event: SelectChangeEvent) => {
    setFilterValue(event.target.value)
  }, [])

  const handleDateSortChange = useCallback((event: SelectChangeEvent) => {
    setDateSort(event.target.value)
  }, [])

  const handleReset = () => {
    setFilterValue("")
    setDateSort("")
  }

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = useCallback((success = false) => {
    setIsModalOpen(false)
    if (success) {
      setShowNotification(true)
      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false)
      }, 5000)
    }
  }, [])

  return (
    <>
      <Container maxWidth={false} sx={{ px: 3, py: 2 }}>
           {showNotification && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgba(6, 165, 97, 1)",
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
                maxWidth: "400px",
                "&:hover": {
                  backgroundColor: "rgba(6, 165, 97, 0.9)",
                  boxShadow: "none",
                },
              }}
            >
              Consignment added successfully
            </Button>
          </Box>
        )}
        <ShipmentHeader
          filterValue={filterValue}
          dateSort={dateSort}
          onFilterChange={handleFilterChange}
          onDateSortChange={handleDateSortChange}
          onReset={handleReset}
          onAddShipment={handleModalOpen}
        />

     

        <ShipmentTable />
      </Container>

      <AddShipmentDialog open={isModalOpen} onClose={(success) => handleModalClose(success)} />
    </>
  )
}

export default ShipmentComp
