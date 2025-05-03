"use client"

import type React from "react"
import { useState } from "react"
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
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import Image from "next/image"
import { useRouter } from 'next/navigation';

// Create a custom styled Switch component that looks like the first image
const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 42,
    height: 22,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(20px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#073E54', // Dark teal/blue color for ON state
            },
        },
    },
    '& .MuiSwitch-thumb': {
        width: 18,
        height: 18,
        borderRadius: '50%',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'rgba(217, 228, 255, 1)', // Light blue color for OFF state
        borderRadius: 32,
    },
}));

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
            styleOverrides: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `,
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
});

export default function Detail({ product }: any) {
    const router = useRouter();
    const [tags, setTags] = useState<string[]>(["trend", "instagram"])
    const [tagInput, setTagInput] = useState("")
    const [hasMultipleOptions, setHasMultipleOptions] = useState(true)
    const [isDigitalItem, setIsDigitalItem] = useState(false)
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price?.replace('$', '') || '',
    });

    const handleAddTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput])
            setTagInput("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleAddTag()
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => router.back()}>
                        <Image src="/backArrow.png" alt="Back" width={13} height={13} />
                        <Typography sx={{ ml: 1, color: '#737791', fontSize: '14px' }}>
                            Back
                        </Typography>
                    </Box>
                </Box>
                
                <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2A44', mb: 2 }}>
                    Update Product
                </Typography>
                
                <Box sx={{ display: "flex", p: 2, minHeight: "100vh", alignItems: "flex-start", gap: 3,mt:-2 }}>
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
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
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
                                    <Button variant="outlined" color="primary" sx={{ mb: 1, textTransform: "none" }}>
                                        Add File
                                    </Button>
                                    <Typography variant="body2" color="textSecondary">
                                        Or drag and drop files
                                    </Typography>
                                </Box>
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
                                            onChange={(e) => setFormData({...formData, price: e.target.value})}
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
                                    control={
                                        <CustomSwitch
                                            checked={true}
                                        />
                                    }
                                    label="Add tax for this product"
                                    sx={{ 
                                        mt: 1, 
                                        "& .MuiFormControlLabel-label": { fontSize: 14 },
                                        "& .MuiSwitch-root": { mr: 2 } // Add margin-right to increase spacing
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
                                        "& .MuiSwitch-root": { mr: 2 } // Add margin-right to increase spacing
                                    }}
                                />

                                {hasMultipleOptions && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            Option 1
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                                                    Name
                                                </Typography>
                                                <FormControl fullWidth size="small">
                                                    <Select value="brand" displayEmpty>
                                                        <MenuItem value="brand">brand</MenuItem>
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
                                                    InputProps={{
                                                        startAdornment: (
                                                            <Box sx={{ display: "flex", gap: 2 }}>
                                                                {["1", "2", "3", "4"].map((size) => (
                                                                    <Chip
                                                                        key={size}
                                                                        label={size}
                                                                        size="small"
                                                                        variant="outlined"
                                                                        deleteIcon={<CloseIcon style={{ fontSize: 14 }} />}
                                                                        onDelete={() => { }}
                                                                        sx={{ borderRadius: 0,bgcolor:"rgba(217, 228, 255, 1)",width:"80%" }}
                                                                    />
                                                                ))}
                                                            </Box>
                                                        ),
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        <Button
                                            startIcon={<AddIcon />}
                                            sx={{
                                                mt: 2,
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
                                        <CustomSwitch
                                            checked={isDigitalItem}
                                            onChange={(e) => setIsDigitalItem(e.target.checked)}
                                        />
                                    }
                                    label="This is digital item"
                                    sx={{ 
                                        mt: 2, 
                                        "& .MuiFormControlLabel-label": { fontSize: 14 },
                                        "& .MuiSwitch-root": { mr: 2 } // Add margin-right to increase spacing
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
                                Update
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
                                    {["about", "brand", "team", "trend", "xyz"].map((category) => (
                                        <Box key={category} sx={{ display: "flex", alignItems: "center" }}>
                                            <FormControlLabel control={<Checkbox size="small" />} label="" sx={{ m: 0, mr: -1 }} />
                                            <Typography variant="body2">{category}</Typography>
                                        </Box>
                                    ))}
                                    <Button
                                        variant="text"
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
                        <Box>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
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
                                    onKeyPress={handleKeyPress}
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
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}