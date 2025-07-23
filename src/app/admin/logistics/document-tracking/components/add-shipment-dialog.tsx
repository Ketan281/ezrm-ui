"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Dialog,
  DialogContent,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Button,
  Chip,
} from "@mui/material"
import { Close, ImportExport, FileDownload, DirectionsBoat, Flight, CloudUpload } from "@mui/icons-material"

const HBL_TRACKER_OPTIONS = [
  { value: "Track1", label: "Track 1" },
  { value: "Track2", label: "Track 2" },
] as const

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

interface AddShipmentDialogProps {
  open: boolean
  onClose: (success?: boolean) => void
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
  // title,
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

const FileUploadArea = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

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

  return (
    <Box sx={{ flex: 1 }}>
      <Box
        onClick={handleFileUpload}
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
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept=".pdf,.xls,.xlsx,.doc,.docx,.png,.jpg,.jpeg"
          style={{ display: "none" }}
        />
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

      {/* Display uploaded files */}
      {uploadedFiles.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              color: "#666",
              mb: 1,
            }}
          >
            Uploaded Files ({uploadedFiles.length}):
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {uploadedFiles.map((file, index) => (
              <Chip
                key={index}
                label={file.name}
                onDelete={() => handleRemoveFile(index)}
                sx={{
                  bgcolor: "#f0f8ff",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  maxWidth: "200px",
                  "& .MuiChip-label": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default function AddShipmentDialog({ open, onClose }: AddShipmentDialogProps) {
  const [importExport, setImportExport] = useState<ImportExportType | "">("")
  const [transportMode, setTransportMode] = useState<TransportModeType | "">("")
  // const fileInputRef = useRef<HTMLInputElement>(null)
  // const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const { formData, updateFormField, resetForm } = useFormData()

  const isFormValid = () => {
    return (
      formData.refNumber.trim() !== "" &&
      formData.poNumber.trim() !== "" &&
      formData.mblNumber.trim() !== "" &&
      formData.containerNumber.trim() !== "" &&
      formData.hblNumber.trim() !== "" &&
      formData.hblTracker.trim() !== ""
    )
  }

  const handleContinue = () => {
    if (isFormValid()) {
      onClose(true) // Pass true to indicate successful submission
      // If you need to pass data back to the parent, you could add a callback prop like onSubmit
    }
  }

  // const handleFileUpload = () => {
  //   fileInputRef.current?.click()
  // }

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files
  //   if (files) {
  //     const newFiles = Array.from(files)
  //     setUploadedFiles((prev) => [...prev, ...newFiles])
  //   }
  // }

  // const handleRemoveFile = (index: number) => {
  //   setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  // }

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

  const handleClose = useCallback(() => {
    setImportExport("")
    setTransportMode("")
    // setUploadedFiles([]) // Add this line
    resetForm()
    onClose()
  }, [resetForm, onClose])

  const bothOptionsSelected = Boolean(importExport && transportMode)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
            onClick={handleClose}
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

        {bothOptionsSelected ? (
          <Box>
            {/* Form Section */}
            <Box sx={{ display: "flex", gap: 4 }}>
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
            <Button
              variant="contained"
              onClick={handleContinue}
              disabled={!isFormValid()}
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
                mt: 3,
                boxShadow: "none",
                fontFamily: "Poppins, sans-serif",
                minWidth: "140px",
                maxWidth: "200px",
                display: "block",
                mx: "auto",
                "&:hover": {
                  backgroundColor: "#E67A35",
                  boxShadow: "none",
                },
                "&:disabled": {
                  backgroundColor: "#ccc",
                  color: "#666",
                },
              }}
            >
              Continue
            </Button>
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
  )
}
