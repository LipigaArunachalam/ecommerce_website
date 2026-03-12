import React from "react";
import { useGetAdminQuery } from "../../../services/rtkQuery/adminApi";
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  Stack
} from "@mui/material";
import {
  Person,
  Email,
  LocationOn,
  Map,
  Home
} from "@mui/icons-material";

const AdminProfile = () => {
  const { data, error, isLoading } = useGetAdminQuery();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">
          Error loading profile. Please try again later.
        </Alert>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="info">No profile data available.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Header Section */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          gap={3}
          mb={4}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "primary.main",
              fontSize: "2.5rem"
            }}
          >
            {data.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Box textAlign={{ xs: "center", sm: "left" }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {data.username}
            </Typography>
            <Chip
              label={data.role?.toUpperCase()}
              color="primary"
              variant="outlined"
              icon={<Person />}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Details Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Email color="action" />
              <Box>
                <Typography variant="caption" color="textSecondary" display="block">
                  Email Address
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {data.email}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <LocationOn color="action" />
              <Box>
                <Typography variant="caption" color="textSecondary" display="block">
                  City
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {data.city || "N/A"}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Map color="action" />
              <Box>
                <Typography variant="caption" color="textSecondary" display="block">
                  State
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {data.state || "N/A"}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Home color="action" />
              <Box>
                <Typography variant="caption" color="textSecondary" display="block">
                  Zip Code
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {data.zip_code || "N/A"}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminProfile;
