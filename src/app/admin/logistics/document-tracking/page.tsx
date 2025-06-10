"use client"

import { useState, useCallback } from "react"
import { Container } from "@mui/material"
import type { SelectChangeEvent } from "@mui/material/Select"
import ShipmentHeader from "./components/shipment-header"
import ShipmentTable from "./components/shipment-table"
import AddShipmentDialog from "./components/add-shipment-dialog"

export default function ShipmentComp() {
  // State management
  const [filterValue, setFilterValue] = useState("")
  const [dateSort, setDateSort] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Event handlers
  const handleFilterChange = useCallback((event: SelectChangeEvent) => {
    setFilterValue(event.target.value)
  }, [])

  const handleDateSortChange = useCallback((event: SelectChangeEvent) => {
    setDateSort(event.target.value)
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
  }, [])

  return (
    <>
      <Container maxWidth={false} sx={{ px: 3, py: 2 }}>
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

      <AddShipmentDialog open={isModalOpen} onClose={handleModalClose} />
    </>
  )
}
