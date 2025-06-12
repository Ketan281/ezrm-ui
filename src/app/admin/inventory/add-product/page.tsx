"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Chip,
  InputAdornment,
  FormControl,
  Checkbox,
  ThemeProvider,
  createTheme,
  CssBaseline,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Create a custom styled Switch component that looks like the first image
const CustomSwitch = styled(Switch)(() => ({
  width: 42,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#073E54", // Dark teal/blue color for ON state
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 18,
    height: 18,
    borderRadius: "50%",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "rgba(217, 228, 255, 1)", // Light blue color for OFF state
    borderRadius: 32,
  },
}))

// Create a theme with Poppins font
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    allVariants: {
      fontFamily: '"Poppins", sans-serif',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "*": {
            fontFamily: '"Poppins", sans-serif',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
  },
})

interface Product {
  id: string
  name: string
  description: string
  inventory: string
  loreal: string
  price: string
  rating: string
}

interface DetailProps {
  product: Product
}

export default function Detail({ product }: DetailProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Separate state for tags and min max orders
  const [tags, setTags] = useState<string[]>(["trend", "instagram"])
  const [tagInput, setTagInput] = useState("")
  const [minMaxTags, setMinMaxTags] = useState<string[]>([])
  const [minMaxInput, setMinMaxInput] = useState("")

  const [hasMultipleOptions, setHasMultipleOptions] = useState(true)
  const [isDigitalItem, setIsDigitalItem] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  // Different Options state
  const [options, setOptions] = useState([{ id: 1, name: "brand", values: ["1", "2", "3", "4"] }])
  const [nextOptionId, setNextOptionId] = useState(2)

  // Category state
  const [categories, setCategories] = useState(["about", "brand", "team", "trend", "xyz"])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showCreateCategory, setShowCreateCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price?.replace("$", "") || "",
  })

  // File upload handlers
  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Tag handlers
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  // Min Max orders handlers
  const handleAddMinMaxTag = () => {
    if (minMaxInput && !minMaxTags.includes(minMaxInput)) {
      setMinMaxTags([...minMaxTags, minMaxInput])
      setMinMaxInput("")
    }
  }

  const handleRemoveMinMaxTag = (tagToRemove: string) => {
    setMinMaxTags(minMaxTags.filter((tag) => tag !== tagToRemove))
  }

  const handleMinMaxKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddMinMaxTag()
    }
  }

  // Category handlers
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleCreateCategory = () => {
    if (newCategoryName && !categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName])
      setNewCategoryName("")
      setShowCreateCategory(false)
    }
  }

  // Options handlers
  const handleAddOption = () => {
    const newOption = {
      id: nextOptionId,
      name: "",
      values: [],
    }
    setOptions([...options, newOption])
    setNextOptionId(nextOptionId + 1)
  }

  const handleRemoveOption = (optionId: number) => {
    setOptions(options.filter((option) => option.id !== optionId))
  }

  const handleOptionNameChange = (optionId: number, name: string) => {
    setOptions(options.map((option) => (option.id === optionId ? { ...option, name } : option)))
  }

  const handleClearAllTags = () => {
    setTags([])
    setTagInput("")
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => router.back()}>
            <Image src="/placeholder.svg?height=13&width=13" alt="Back" width={13} height={13} />
            <Typography sx={{ ml: 1, color: "#737791", fontSize: "14px" }}>Back</Typography>
          </Box>
        </Box>

        <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "#1F2A44", mb: 2 }}>Add Product</Typography>

        <Box sx={{ display: "flex", p: 2, minHeight: "100vh", alignItems: "flex-start", gap: 3, mt: -2 }}>
          {/* Left Section */}
          <Box sx={{ flex: 1, pr: 2, bgcolor: "#fff", m: 2, p: 6, pt: 2, pb: 2 }}>
            {/* Information Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                Information
              </Typography>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                  Product Name
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                  Product Description
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                  placeholder="Product description"
                  sx={{ mb: 1 }}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Paper>
            </Box>

            {/* Images Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                Images
              </Typography>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Box
                  sx={{
                    border: "1px dashed #ccc",
                    borderRadius: 1,
                    p: 3,
                    textAlign: "center",
                    bgcolor: "#fff",
                  }}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mb: 1, textTransform: "none" }}
                    onClick={handleFileUpload}
                  >
                    Add File
                  </Button>
                  <Typography variant="body2" color="textSecondary">
                    Or drag and drop files
                  </Typography>
                </Box>

                {/* Display uploaded files */}
                {uploadedFiles.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                      Uploaded Files:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {uploadedFiles.map((file, index) => (
                        <Chip
                          key={index}
                          label={file.name}
                          onDelete={() => handleRemoveFile(index)}
                          deleteIcon={<CloseIcon style={{ fontSize: 14 }} />}
                          sx={{ bgcolor: "#f0f0f0" }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Paper>
            </Box>

            {/* Price Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                Price
              </Typography>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                      Product Price
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                      Discount Price
                    </Typography>
                    <TextField fullWidth variant="outlined" size="small" placeholder="Price at checkout" />
                  </Box>
                </Box>
                <FormControlLabel
                  control={<CustomSwitch checked={true} />}
                  label="Add tax for this product"
                  sx={{
                    mt: 1,
                    "& .MuiFormControlLabel-label": { fontSize: 14 },
                    "& .MuiSwitch-root": { mr: 2 },
                  }}
                />
              </Paper>
            </Box>

            {/* Different Options */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                Different Options
              </Typography>
              <Paper sx={{ p: 2, mb: 2 }}>
                <FormControlLabel
                  control={
                    <CustomSwitch
                      checked={hasMultipleOptions}
                      onChange={(e) => setHasMultipleOptions(e.target.checked)}
                    />
                  }
                  label="This product has multiple options"
                  sx={{
                    "& .MuiFormControlLabel-label": { fontSize: 14 },
                    "& .MuiSwitch-root": { mr: 2 },
                  }}
                />

                {hasMultipleOptions && (
                  <Box sx={{ mt: 2 }}>
                    {options.map((option, index) => (
                      <Box key={option.id} sx={{ mb: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                          <Typography variant="subtitle2">Option {index + 1}</Typography>
                          {options.length > 1 && (
                            <Button
                              size="small"
                              onClick={() => handleRemoveOption(option.id)}
                              sx={{ color: "error.main", minWidth: "auto", p: 0.5 }}
                            >
                              <CloseIcon sx={{ fontSize: 16 }} />
                            </Button>
                          )}
                        </Box>
                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                              Name
                            </Typography>
                            <FormControl fullWidth size="small">
                              <Select
                                value={option.name}
                                displayEmpty
                                onChange={(e) => handleOptionNameChange(option.id, e.target.value)}
                              >
                                <MenuItem value="">Select option</MenuItem>
                                <MenuItem value="brand">brand</MenuItem>
                                <MenuItem value="size">size</MenuItem>
                                <MenuItem value="color">color</MenuItem>
                                <MenuItem value="material">material</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                              Values
                            </Typography>
                            <TextField
                              fullWidth
                              variant="outlined"
                              size="small"
                            //   placeholder="Enter values separated by commas"
                              InputProps={{
                                startAdornment: option.values.length > 0 && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      gap: 1,
                                    //   flexWrap: "wrap",
                                      mr: 1,
                                      maxWidth: "calc(100% - 100px)", // Leave space for input text
                                      "& > *": {
                                        flexBasis: "calc(25% - 8px)", // 4 chips per row with gap
                                        minWidth: "60px",
                                        maxWidth: "80px",
                                      },
                                    }}
                                  >
                                    {option.values.map((value, valueIndex) => (
                                      <Chip
                                        key={valueIndex}
                                        label={value}
                                        size="small"
                                        variant="outlined"
                                        deleteIcon={<CloseIcon style={{ fontSize: 14 }} />}
                                        onDelete={() => {
                                          // Remove this specific value from the option
                                          const newValues = option.values.filter((_, i) => i !== valueIndex)
                                          setOptions(
                                            options.map((opt) =>
                                              opt.id === option.id ? { ...opt, values: newValues } : opt,
                                            ),
                                          )
                                        }}
                                        sx={{
                                          borderRadius: 0,
                                          bgcolor: "rgba(217, 228, 255, 1)",
                                          fontSize: "12px",
                                          height: "24px",
                                          "& .MuiChip-label": {
                                            px: 1,
                                          },
                                        }}
                                      />
                                    ))}
                                  </Box>
                                ),
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                    <Button
                      startIcon={<AddIcon />}
                      onClick={handleAddOption}
                      sx={{
                        mt: 1,
                        color: "primary.main",
                        textTransform: "none",
                        p: 0,
                      }}
                    >
                      Add More
                    </Button>
                  </Box>
                )}
              </Paper>
            </Box>

            {/* Shipping */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                Shipping
              </Typography>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                      Weight
                    </Typography>
                    <TextField fullWidth variant="outlined" size="small" placeholder="Enter Weight" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                      Country
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select value="" displayEmpty renderValue={() => "Select Country"}>
                        <MenuItem value="">Select Country</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <FormControlLabel
                  control={
                    <CustomSwitch checked={isDigitalItem} onChange={(e) => setIsDigitalItem(e.target.checked)} />
                  }
                  label="This is digital item"
                  sx={{
                    mt: 2,
                    "& .MuiFormControlLabel-label": { fontSize: 14 },
                    "& .MuiSwitch-root": { mr: 2 },
                  }}
                />
              </Paper>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button variant="text" sx={{ color: "#000" }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#FFA500",
                  color: "#fff",
                  "&:hover": { bgcolor: "#FF8C00" },
                  px: 4,
                }}
              >
                Add
              </Button>
            </Box>
          </Box>

          {/* Right Section */}
          <Box sx={{ width: 250 }}>
            {/* Categories */}
            <Box sx={{ mb: 4 }}>
              <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                  Categories
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {categories.map((category) => (
                    <Box key={category} sx={{ display: "flex", alignItems: "center" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                          />
                        }
                        label=""
                        sx={{ m: 0, mr: -1 }}
                      />
                      <Typography variant="body2">{category}</Typography>
                    </Box>
                  ))}
                  <Button
                    variant="text"
                    onClick={() => setShowCreateCategory(true)}
                    sx={{
                      color: "#1976d2",
                      textTransform: "none",
                      justifyContent: "flex-start",
                      p: 0,
                      mt: 1,
                    }}
                  >
                    Create New
                  </Button>
                </Box>
              </Paper>
            </Box>

            {/* Tags */}
            <Box sx={{ mb: 4 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, color: "black" }}>
                  Tags
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    color: "#1976d2",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    p: 0,
                    mb: 1,
                  }}
                >
                  Add Tags
                </Button>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Enter tag name"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      onDelete={() => handleRemoveTag(tag)}
                      deleteIcon={<CloseIcon style={{ fontSize: 14 }} />}
                      sx={{
                        bgcolor: tag === "trend" ? "#f0f0f0" : "#e6e6fa",
                        borderRadius: 0,
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Box>

            {/* Min Max Orders */}
            <Box>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                  Min Max orders
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    color: "#1976d2",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    p: 0,
                    mb: 1,
                  }}
                >
                  Add Orders
                </Button>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Enter order limit"
                  value={minMaxInput}
                  onChange={(e) => setMinMaxInput(e.target.value)}
                  onKeyPress={handleMinMaxKeyPress}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {minMaxTags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      onDelete={() => handleRemoveMinMaxTag(tag)}
                      deleteIcon={<CloseIcon style={{ fontSize: 14 }} />}
                      sx={{
                        bgcolor: "#f0f8ff",
                        borderRadius: 0,
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>

        {/* Create Category Dialog */}
        <Dialog open={showCreateCategory} onClose={() => setShowCreateCategory(false)}>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              fullWidth
              variant="outlined"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCreateCategory(false)}>Cancel</Button>
            <Button onClick={handleCreateCategory} variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  )
}
