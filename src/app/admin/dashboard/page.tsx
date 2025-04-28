import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import Image from 'next/image';

export default function Dashboard() {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid display={"flex"} justifyContent={"space-around"} width={"100%"}>
          <Card sx={{ backgroundColor: '#fff', textAlign: 'center', p: 1, width: "216px", height: "96px", borderRadius: "10px" }}>
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <Box height={50} width={50} borderRadius={"50px"} sx={{ backgroundColor: 'rgba(91, 147, 255, 0.1)', display: "grid", placeItems: "center", }}>
                <Image src="/Heart.png" alt="Products" width={20} height={20} />
              </Box>
              <Typography variant="h6" fontSize={"11px"} sx={{ textAlign: "left" }}>
                <Typography component="span" sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  178+
                </Typography>
                <br />
                Products
              </Typography>
              {/* <Typography variant="h6" fontSize={"11px"}><b style={{ fontSize: "15px" }}>178+</b><br />Products</Typography> */}
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: '#fff', textAlign: 'center', p: 1, width: "216px", height: "96px", borderRadius: "10px" }}>
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <Box height={50} width={50} borderRadius={"50px"} sx={{ backgroundColor: 'rgba(255, 214, 107, 0.1)', display: "grid", placeItems: "center", }}>
                <Image src="/Game.png" alt="Products" width={20} height={20} />
              </Box>
              <Typography variant="h6" fontSize={"11px"} sx={{ textAlign: "left" }}>
                <Typography component="span" sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  20+
                </Typography>
                <br />
                Running out of stock
              </Typography>
              {/* <Typography variant="h6" fontSize={"11px"}><b style={{ fontSize: "15px" }}>20+</b><br />Running out of stock</Typography> */}
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: '#fff', textAlign: 'center', p: 1, width: "216px", height: "96px", borderRadius: "10px" }}>
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <Box height={50} width={50} borderRadius={"50px"} sx={{ backgroundColor: 'rgba(255, 143, 107, 0.1)', display: "grid", placeItems: "center", }}>
                <Image src="/Bag.png" alt="Products" width={20} height={20} />
              </Box>
              <Typography variant="h6" fontSize={"11px"} sx={{ textAlign: "left" }}>
                <Typography component="span" sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  190+
                </Typography>
                <br />
                Approaching Expiry
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: '#fff', textAlign: 'center', p: 1, width: "216px", height: "96px", borderRadius: "10px" }}>
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <Box height={50} width={50} borderRadius={"50px"} sx={{ backgroundColor: 'rgba(255, 143, 107, 0.1)', display: "grid", placeItems: "center", }}>
                <Image src="/Bag.png" alt="Products" width={20} height={20} />
              </Box>
              <Typography variant="h6" fontSize={"11px"} sx={{ textAlign: "left" }}>
                <Typography component="span" sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  190+
                </Typography>
                <br />
                Approaching Expiry
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}