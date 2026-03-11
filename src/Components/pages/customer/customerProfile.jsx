import React from "react";
import { useCustomerDetailsQuery } from "../../../services/rtkQuery/customerApi";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Divider, 
  Grid, 
  Paper,
  Chip
} from "@mui/material";
import { Email, LocationOn, HomeWork, Badge } from "@mui/icons-material";

const CustomerProfile = () => {

  const { data, error, isLoading } = useCustomerDetailsQuery();

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error loading profile</p>;
  }

  if (!data) {
    return <p>No data</p>;
  }

  return (
    <Box sx={{ maxWidth: 3000, mx: "auto", mt: 4 }}>
      <Card sx={{ borderRadius: 2, boxShadow: 1, mb: 4, textAlign: 'center' }}>
  <CardContent sx={{ p: 4 }}>
    <Avatar 
      sx={{ 
        width: 80, 
        height: 80, 
        mx: 'auto', 
        bgcolor: 'primary.main',
        mb: 2 
      }}
    >
      {data.username?.charAt(0).toUpperCase()}
    </Avatar>

    <Typography variant="h5" fontWeight="bold" sx={{textTransform: 'capitalize'}}>
      {data.username}
    </Typography>

    <Chip 
      label={data.role} 
      size="large" 
      sx={{ mt: 1, textTransform: 'capitalize' }} 
    />
  </CardContent>
</Card>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Email color="primary" />
            <Box>
              <Typography variant="caption" color="text.secondary">Email Address</Typography>
              <Typography variant="body1">{data.email}</Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocationOn color="primary" />
            <Box>
              <Typography variant="caption" color="text.secondary">Location</Typography>
              <Typography variant="body1">{data.city}, {data.state}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <HomeWork color="primary" />
            <Box>
              <Typography variant="caption" color="text.secondary">Zip Code</Typography>
              <Typography variant="body1">{data.zip_code}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Badge color="primary" />
            <Box>
              <Typography variant="caption" color="text.secondary">Account Type</Typography>
              <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{data.role}</Typography>
            </Box>
          </Paper>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default CustomerProfile;