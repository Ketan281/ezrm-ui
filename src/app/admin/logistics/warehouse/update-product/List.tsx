"use client"

import React, { useState } from "react"
import { Box, Typography } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { TableComponent } from "../../../../../components/TableComponent"

// Define the base TableRowData interface that matches what TableComponent expects
interface TableRowData {
  id: string
  [key: string]: string | number | boolean | null | undefined | React.ReactNode
}

// ProductRowData extends TableRowData
interface ProductRowData extends TableRowData {
  name: string
  description: string
  inventory: string
  loreal: string
  price: string
  rating: string
}

export default function UpdateList() {
  const router = useRouter()
  const [filter, setFilter] = useState("")
  const [page, setPage] = useState(2)

  const rawData = [
    {
      id: "1",
      name: "vitamin",
      description: "loreal ipsum",
      inventory: "96 in stock",
      loreal: "Black",
      price: "$49.90",
      rating: "5.0 (32 Votes)",
    },
    {
      id: "2",
      name: "vitamin",
      description: "loreal ipsum",
      inventory: "56 in stock",
      loreal: "White",
      price: "$34.90",
      rating: "4.8 (24 Votes)",
    },
    {
      id: "3",
      name: "vitamin",
      description: "loreal ipsum",
      inventory: "78 in stock",
      loreal: "White",
      price: "$40.90",
      rating: "5.0 (54 Votes)",
    },
    {
      id: "4",
      name: "vitamin",
      description: "loreal ipsum",
      inventory: "32 in stock",
      loreal: "White",
      price: "$49.90",
      rating: "4.5 (31 Votes)",
    },
    {
      id: "5",
      name: "vitamin",
      description: "loreal ipsum",
      inventory: "32 in stock",
      loreal: "White",
      price: "$34.90",
      rating: "4.9 (22 Votes)",
    },
    {
      id: "6",
      name: "vitamin",
      description: "loreal ipsum",
      inventory: "96 in stock",
      loreal: "Black",
      price: "$49.90",
      rating: "5.0 (32 Votes)",
    },
    {
      id: "7",
      name: "vitamin",
      description: "loreal ipsum",
      inventory: "56 in stock",
      loreal: "White",
      price: "$34.90",
      rating: "4.8 (24 Votes)",
    },
    {
      id: "8",
      name: "vitamin",
      description: "loreal ipsum",
      inventory: "Out of Stock",
      loreal: "White",
      price: "$40.90",
      rating: "5.0 (54 Votes)",
    },
    {
      id: "9",
      name: "vitamin",
      description: "loreal ipsum",
      inventory: "Out of Stock",
      loreal: "White",
      price: "$49.90",
      rating: "4.5 (31 Votes)",
    },
    {
      id: "10",
      name: "vitamin",
      description: "loreal ipsum",
      inventory: "Out of Stock",
      loreal: "White",
      price: "$34.90",
      rating: "4.9 (22 Votes)",
    },
  ]

  const processRowData = (row: (typeof rawData)[0]): ProductRowData => ({
    ...row,
    name: `${row.name} - ${row.description}`, // Combine name and description as a string
    rating: row.rating, // Use the raw string value
  })

  const tableData: ProductRowData[] = rawData.map(processRowData)
  const totalResults = 146

  const columns = [
    { id: "name", label: "Product", width: "25%" },
    { id: "inventory", label: "Inventory", width: "20%" },
    { id: "loreal", label: "Loreal", width: "20%" },
    { id: "price", label: "Price", width: "15%" },
    { id: "rating", label: "Rating", width: "15%" },
  ]

  const filterOptions = {
    value: filter,
    onChange: setFilter,
    options: [
      { value: "Product ID", label: "Product ID" },
      { value: "Product Name", label: "Product Name" },
      { value: "Category", label: "Category" },
    ],
  }

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleRowClick = (row: TableRowData) => {
    const productRow = row as ProductRowData

    const query = new URLSearchParams({
      id: productRow.id,
      name: productRow.name,
      description: productRow.description,
      inventory: productRow.inventory,
      loreal: productRow.loreal,
      price: productRow.price,
      rating: productRow.rating,
    }).toString()

    router.push(`/admin/logistics/warehouse/update-product/detail?${query}`)
  }

  return (
    <Box sx={{ p: 1, backgroundColor: "#F9FAFB", minHeight: "85vh", fontFamily: "Poppins, sans-serif" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => router.back()}>
          <Image src="/backArrow.png" alt="Back" width={13} height={13} />
          <Typography sx={{ ml: 1, color: "#737791", fontSize: "14px", fontFamily: "Poppins, sans-serif" }}>
            Back
          </Typography>
        </Box>
      </Box>
      <Typography
        sx={{ fontSize: "24px", fontWeight: "bold", color: "#1F2A44", mb: 2, fontFamily: "Poppins, sans-serif" }}
      >
        Update Product
      </Typography>

      <TableComponent
        columns={columns}
        data={tableData}
        totalResults={totalResults}
        currentPage={page}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
        filterOptions={filterOptions}
        showCheckboxes={true}
        showHeader={true}
        rowsPerPage={9}
      />
    </Box>
  )
}