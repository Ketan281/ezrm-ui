"use client"

import type React from "react"
import { useState } from "react"
import { Box, Typography, Button, TextField, Rating, Paper, IconButton } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import CloseIcon from "@mui/icons-material/Close"
import Image from "next/image"

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(100)
  const [selectedWeight, setSelectedWeight] = useState("1.5 kg")

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value))
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", p: 2 }}>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <Box sx={{ mb: 2, p: 2 }}>
          {/* Back Button Row */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <IconButton sx={{ p: 0, mr: 1 }}>
              <ArrowBackIcon sx={{ fontSize: "20px", color: "#666" }} />
            </IconButton>
            <Typography sx={{ fontSize: "16px", color: "#666" }}>Back</Typography>
          </Box>

          {/* View Product and Transfer Button Row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1976d2",
              }}
            >
              View Product/
              <Typography component="span" sx={{ color: "#666", fontWeight: "normal" }}>
                Product Name
              </Typography>
            </Typography>

            <Button
              sx={{
                backgroundColor: "#ff9800",
                color: "white",
                textTransform: "none",
                borderRadius: "20px",
                px: 3,
                py: 1,
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "#f57c00",
                },
              }}
            >
              Transfer To Inventory
            </Button>
          </Box>
        </Box>

        {/* Main Content */}
        <Paper sx={{ borderRadius: "8px", overflow: "hidden", backgroundColor: "white" }}>
          <Box sx={{ display: "flex" }}>
            {/* Left Column - Image */}
            <Box sx={{ width: "320px" }}>
              <Image
                src="/productDetail.png"
                alt="Product Image"
                width={320}
                height={500}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Box>

            {/* Right Column - Product Details */}
            <Box sx={{ flex: 1, p: 3 }}>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "600",
                  mb: 1,
                  color: "#333",
                }}
              >
                Product Name / Loreal Ipsum loreal ipsum
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#4caf50",
                    mr: 2,
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  VITAMIN
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating value={4.9} precision={0.1} readOnly size="small" sx={{ mr: 1 }} />
                  <Typography sx={{ fontSize: "14px", color: "#666" }}>4.9 (2130 reviews)</Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  mb: 1,
                  color: "#333",
                }}
              >
                Description:
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: "14px", mb: 1, color: "#666" }}>
                  • Makanan yang lengkap dan seimbang, dengan 41 nutrisi penting.
                </Typography>
                <Typography sx={{ fontSize: "14px", mb: 1, color: "#666" }}>
                  • Mengandung antioksidan (vitamin E dan selenium) untuk sistem kekebalan tubuh yang sehat.
                </Typography>
                <Typography sx={{ fontSize: "14px", mb: 1, color: "#666" }}>
                  • Mengandung serat untuk memperlancar pencernaan dan meningkatkan kesehatan usus.
                </Typography>
                <Typography sx={{ fontSize: "14px", mb: 1, color: "#666" }}>
                  • Diperkaya dengan kalsium, fosfor dan vitamin D untuk tulang yang sehat.
                </Typography>
              </Box>

              {/* Thumbnail Images */}
              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                {[1, 2, 3].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      backgroundColor: item === 1 ? "#333" : "#ccc",
                    }}
                  >
                    <Image
                      src="/productDetail.png"
                      alt={`Thumbnail ${item}`}
                      width={50}
                      height={50}
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  Ingredients:
                </Typography>
                <IconButton sx={{ p: 0 }}>
                  <CloseIcon sx={{ fontSize: "20px", color: "#666" }} />
                </IconButton>
              </Box>

              {/* Quantity and Price Row */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  mb: 3,
                }}
              >
                <Typography sx={{ fontSize: "14px", color: "#333", minWidth: "30px" }}>Qty:</Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={decrementQuantity}
                    sx={{
                      width: "32px",
                      height: "32px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  >
                    <RemoveIcon sx={{ fontSize: "16px" }} />
                  </IconButton>

                  <TextField
                    value={quantity}
                    onChange={handleQuantityChange}
                    variant="outlined"
                    size="small"
                    type="number"
                    sx={{
                      width: "80px",
                      "& .MuiOutlinedInput-root": {
                        height: "32px",
                        "& input": {
                          textAlign: "center",
                          padding: "6px",
                        },
                      },
                    }}
                  />

                  <IconButton
                    onClick={incrementQuantity}
                    sx={{
                      width: "32px",
                      height: "32px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  >
                    <AddIcon sx={{ fontSize: "16px" }} />
                  </IconButton>
                </Box>

                <Typography sx={{ fontSize: "14px", color: "#333", minWidth: "40px" }}>Price:</Typography>

                <TextField
                  value="1123345"
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    width: "120px",
                    "& .MuiOutlinedInput-root": {
                      height: "32px",
                      "& input": {
                        padding: "6px 12px",
                      },
                    },
                  }}
                />

                <Button
                  sx={{
                    backgroundColor: "#ff9800",
                    color: "white",
                    textTransform: "none",
                    borderRadius: "20px",
                    px: 3,
                    py: 1,
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "#f57c00",
                    },
                  }}
                >
                  Transfer To Inventory
                </Button>
              </Box>

              {/* Quantity Options */}
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  mb: 2,
                  color: "#333",
                }}
              >
                Quantity
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                {["1.5 kg", "1 kg", "500 gr", "250 gr"].map((weight) => (
                  <Button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    sx={{
                      borderRadius: "20px",
                      padding: "6px 16px",
                      minWidth: "70px",
                      backgroundColor: selectedWeight === weight ? "#ff9800" : "#f5f5f5",
                      color: selectedWeight === weight ? "#fff" : "#333",
                      border: "1px solid #ddd",
                      textTransform: "none",
                      fontSize: "14px",
                      "&:hover": {
                        backgroundColor: selectedWeight === weight ? "#f57c00" : "#eeeeee",
                      },
                    }}
                  >
                    {weight}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
