import React from "react";
import { useGetSellerDetailsQuery } from "../../../services/rtkQuery/sellerApi";
import { Email, LocationOn, Map, Home } from "@mui/icons-material";
import ProfileLayout from "../../layouts/ProfileLayout";
import { useSellerDashboardQuery } from "../../../services/rtkQuery/sellerApi";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const SellerProfile = () => {

  const { data, error, isLoading } = useGetSellerDetailsQuery();
  const { data: dashData } = useSellerDashboardQuery();

  const fields = [
    { icon: <Email color="primary" />, label: "Email Address", value: data?.email },
    { icon: <LocationOn color="primary" />, label: "City", value: data?.city },
    { icon: <Map color="primary" />, label: "State", value: data?.state },
    { icon: <Home color="primary" />, label: "Zip Code", value: data?.zip_code },
  ];

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error loading profile</p>;
  }

  if (!data) {
    return <p>No data</p>;
  }
  console.log(dashData);

  return (
    <Box>
      <ProfileLayout
        data={data}
        isLoading={isLoading}
        isError={!!error}
        fields={fields} />

      <Box mt={4}>
        <Grid container spacing={3}>

          <Grid xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Products
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {dashData?.totalProducts || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Revenue
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  ${dashData?.totalRevenue || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Delivered Orders
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {dashData?.statusCounts?.delivered || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Shipped Orders
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {dashData?.statusCounts?.shipped || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Processing Orders
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {dashData?.statusCounts?.processing || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Cancelled Orders
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {dashData?.statusCounts?.canceled || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Box>
    </Box>

  );
};

export default SellerProfile;