import React from "react";
import {
    Box,
    Typography,
    Button,
    Avatar,
    Paper,
    Grid,
    TextField,
    Divider
} from "@mui/material";
import { Edit, LocationOn, Phone, Email } from "@mui/icons-material";

const RFQRequests = () => {
    return (
        <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 2, bgcolor: "#f8f9fa" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: "#0f3b5c"
                    }}
                >
                    RFQ Requests
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "#ffc107",
                            color: "#ffc107",
                            textTransform: "none",
                            borderRadius: "4px",
                            px: 2,
                            py: 0.5,
                            fontSize: "0.875rem",
                            "&:hover": {
                                borderColor: "#e6af00",
                                backgroundColor: "rgba(255, 193, 7, 0.04)"
                            }
                        }}
                    >
                        Send Follow up Email
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "#4caf50",
                            color: "#4caf50",
                            textTransform: "none",
                            borderRadius: "4px",
                            px: 2,
                            py: 0.5,
                            fontSize: "0.875rem",
                            "&:hover": {
                                borderColor: "#43a047",
                                backgroundColor: "rgba(76, 175, 80, 0.04)"
                            }
                        }}
                    >
                        Approve RFQ
                    </Button>
                    <Button
                        sx={{
                            minWidth: "auto",
                            p: 0.5,
                            color: "#757575",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.04)"
                            }
                        }}
                    >
                        <Edit fontSize="small" />
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={32}>
                <Grid display={"flex"} gap={2}>
                    <Paper
                        elevation={0}

                        sx={{
                            p: 3,
                            borderRadius: 1,
                            border: "1px solid #e0e0e0",
                            backgroundColor: "#fff",
                            // width: "200%"
                        }}
                    >
                        <Box sx={{ display: "flex", mb: 3 }}>
                            <Avatar
                                sx={{
                                    bgcolor: "#0f3b5c",
                                    width: 50,
                                    height: 50,
                                    mr: 2,
                                    fontSize: "1.25rem"
                                }}
                            >
                                R
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333", mb: 0 }}>
                                    Robin Back
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#666", mb: 0 }}>
                                    India
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#666", mb: 0 }}>
                                    <span style={{ color: "#3f51b5" }}>5 Orders</span>
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#666" }}>
                                    <span style={{ color: "#3f51b5" }}>Customer for 2 years</span>
                                </Typography>
                            </Box>
                        </Box>
                        <Divider></Divider>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333", mb: 2,mt:2 }}>
                            Order Details
                        </Typography>

                        <Box sx={{ mb: 2, }} display={"flex"} gap={10}>
                            <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                                Product
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center",gap:10 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        bgcolor: "#f0f0f0",
                                        mr: 2,
                                        borderRadius: 1
                                    }}
                                />
                                <Box display={"flex"} gap={10}>
                                    <Typography variant="body2" sx={{ color: "#666" }}>
                                        Vitamin
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#666" }}>
                                        T-loveal (psum)
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ mb: 2 }} display={"flex"} gap={10}>
                            <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                                Quantity
                            </Typography>
                            <Typography variant="body2">354</Typography>
                        </Box>

                        <Box sx={{ mb: 3 }} display={"flex"} gap={10}>
                            <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                                Location
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#666" }}>
                                T-loveal (psum)T-loveal (psumT-loveal (psumT-
                            </Typography>
                        </Box>
                    </Paper>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 1,
                            border: "1px solid #e0e0e0",
                            backgroundColor: "#fff",
                            maxHeight:"70%"
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333", mb: 2 }}>
                            Company Details
                        </Typography>

                        <Typography variant="body1" sx={{ fontWeight: 500, color: "#333", mb: 2 }}>
                            Loreal Ipsum Company Name
                        </Typography>

                        <Box sx={{ display: "flex", mb: 2, alignItems: "flex-start" }}>
                            <LocationOn sx={{ color: "#f57c00", mr: 1, fontSize: "1.2rem" }} />
                            <Typography variant="body2" sx={{ color: "#666" }}>
                                Loreal ipsum garden - high street, srinagar - 670004
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", mb: 2, alignItems: "center" }}>
                            <Phone sx={{ color: "#666", mr: 1, fontSize: "1.2rem" }} />
                            <Typography variant="body2" sx={{ color: "#666" }}>
                                +91 9804789764
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Email sx={{ color: "#666", mr: 1, fontSize: "1.2rem" }} />
                            <Typography variant="body2" sx={{ color: "#666" }}>
                                randomppl@gmail.com
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid>
                  
                </Grid>
                <Grid width={"56%"} mt={-28} ml={-32}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333", mb: 2 }}>
                        Customer Notes
                    </Typography>
                    <Paper
                    sx={{
                        p:2
                    }}
                    >
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                            Notes
                        </Typography>
                        <TextField
                            multiline
                            fullWidth
                            rows={3}
                            variant="outlined"
                            value="Loreal ipsumLoreal ipsums Loreal ipsums Loreal ipsums Loreal ipsums loreal Loreal ipsums Loreal ipsums Loreal ipsums Loreal ipsums Loreal ipsums Lors"
                            InputProps={{
                                readOnly: true,
                                sx: {
                                    color: "#666",
                                    fontSize: "0.875rem"
                                }
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#e0e0e0"
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#e0e0e0"
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#e0e0e0"
                                    }
                                }
                            }}
                        />
                    </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RFQRequests;