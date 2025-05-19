"use client"
import { Box, Typography, Avatar, Button, Paper, Grid } from "@mui/material"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import LocationOnIcon from "@mui/icons-material/LocationOn"

export default function UserProfileCard() {
  return (
    <Box sx={{ display: "flex", gap: 5, maxWidth: "950px", width: "100%" }}>
      {/* Left Section */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          padding: "24px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "#1e3a5f",
              width: 56,
              height: 56,
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            R
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Robin Bask
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", fontSize: "14px" }}>
              India
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mt: 3,ml:8 }}>
          <Grid >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon sx={{ color: "#666", fontSize: "18px", minWidth: "20px" }} />
              <Typography variant="body2" sx={{ color: "#666", fontSize: "14px" }}>
                +91 8804789784
              </Typography>
            </Box>
          </Grid>

          <Grid >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon sx={{ color: "#666", fontSize: "18px", minWidth: "20px" }} />
              <Typography variant="body2" sx={{ color: "#666", fontSize: "14px" }}>
                randhrpol@gmail.com
              </Typography>
            </Box>
          </Grid>

          <Grid>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <LocationOnIcon
                sx={{
                  color: "#666",
                  fontSize: "18px",
                  minWidth: "20px",
                  mt: "2px",
                }}
              />
              <Typography variant="body2" sx={{ color: "#666", fontSize: "14px" }}>
                Lorem ipsum garden, high street, jungi - 678004
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Right Section */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          width: "350px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Amount Paid
            </Typography>
            <Typography variant="body2" sx={{ color: "#00b894", fontWeight: "bold" }}>
              $123
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Amount pending
            </Typography>
            <Typography variant="body2" sx={{ color: "#ff5252", fontWeight: "bold" }}>
              $123
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Due Date
            </Typography>
            <Typography variant="body2" sx={{ color: "#333" }}>
              April 2, 2025
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            textTransform: "none",
            backgroundColor: "#ffa726",
            "&:hover": {
              backgroundColor: "#f57c00",
            },
            borderRadius: "4px",
            py: 1,
          }}
        >
          Request Payment
        </Button>
      </Paper>
    </Box>
  )
}
