import React, { useState } from "react";
import { useCustomerDetailsQuery, useUserDashboardQuery, useEditProfileMutation } from "../../../services/rtkQuery/customerApi";
import { Email, LocationOn, Home, Map } from "@mui/icons-material";
import ProfileLayout from "../../layouts/ProfileLayout";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Box, Grid, Paper, Typography, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import SnackBar from "../../../services/snackBar/snackBar";



const CustomerProfile = () => {

  const { data, error, isLoading } = useCustomerDetailsQuery();
  const { data: dashboard } = useUserDashboardQuery();
  const [editProfile] = useEditProfileMutation();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");

  const fields = [
    { icon: <Email color="primary" />, label: "Email Address", value: data?.email },
    { icon: <LocationOn color="primary" />, label: "City", value: data?.city },
    { icon: <Map color="primary" />, label: "State", value: data?.state },
    { icon: <Home color="primary" />, label: "Zip Code", value: data?.zip_code },
  ];

  const [openEdit, setOpenEdit] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    city: "",
    state: "",
    zip_code: ""
  });

  const handleEditOpen = () => {
    setFormData({
      email: data?.email || "",
      city: data?.city || "",
      state: data?.state || "",
      zip_code: data?.zip_code || ""
    });

    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {

      const uid = localStorage.getItem("user_id");
      console.log(formData)
      await editProfile({
        uid: uid,
        data: formData
      }).unwrap();
     
      setOpenEdit(false);
      setSnackMessage("edited sucessfully")
      setSnackSeverity("success")
      setSnackOpen(true)

    } catch (err) {
      console.error("Profile update failed:", err);
      setSnackMessage(err.data.message)
      setSnackSeverity("error")
      setSnackOpen(true)
    }
  };



  return (
    <Box sx={{ width: "100%" }}>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditOpen}
        >
          Edit Profile
        </Button>
      </Box>
      <ProfileLayout
        data={data}
        isLoading={isLoading}
        isError={!!error}
        fields={fields}
      />
      <Dialog open={openEdit} onClose={handleClose} maxWidth="sm" fullWidth>

        <DialogTitle>Edit Profile</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Zip Code"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            fullWidth
          />

        </DialogContent>

        <DialogActions>

          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>

        </DialogActions>

      </Dialog>

      <Box sx={{ mt: 5, px: 2 }}>

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Customer Dashboard
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3,1fr)"
            },
            gap: 3,
            mb: 4
          }}
        >

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid rgba(156,53,197,0.2)",
              background: "rgba(156,53,197,0.05)"
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Total Spent
            </Typography>

            <Typography
              variant="h4"
              sx={{ color: "#9c35c5", fontWeight: 700 }}
            >
              ${dashboard?.total_spent || 0}
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid rgba(156,53,197,0.2)"
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Total Orders
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {dashboard?.total_orders || 0}
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid rgba(156,53,197,0.2)"
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Delivered Orders
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {dashboard?.delivered_orders || 0}
            </Typography>
          </Paper>

        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr"
            },
            gap: 3
          }}
        >

          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Status
            </Typography>

            <PieChart
              height={260}
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: dashboard?.delivered_orders || 0,
                      label: "Delivered",
                      color: "#4caf50"
                    },
                    {
                      id: 1,
                      value:
                        (dashboard?.total_orders || 0) -
                        (dashboard?.delivered_orders || 0),
                      label: "Pending",
                      color: "#9c35c5"
                    }
                  ]
                }
              ]}
            />
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Orders Overview
            </Typography>

            <BarChart
              height={260}
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Orders", "Delivered"]
                }
              ]}
              series={[
                {
                  data: [
                    dashboard?.total_orders || 0,
                    dashboard?.delivered_orders || 0
                  ],
                  color: "#9c35c5"
                }
              ]}
            />
          </Paper>

        </Box>

      </Box>

      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={() => setSnackOpen(false)}
      />
    </Box>
  );
}




// return (
//   <Box>
//   <ProfileLayout
//         data={data}
//         isLoading={isLoading}
//         isError={!!error}
//         fields={fields}/>

//   <Box sx={{ mt: 4 }}>

//       <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
//         Customer Dashboard
//       </Typography>

//       <Grid container spacing={3}>

//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 3, borderRadius: 3 }}>
//             <Typography variant="subtitle2" color="text.secondary">
//               Total Spent
//             </Typography>
//             <Typography variant="h4" sx={{ color: "#9c35c5", fontWeight: 700 }}>
//               ${dashboard?.total_spent || 0}
//             </Typography>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 3, borderRadius: 3 }}>
//             <Typography variant="subtitle2" color="text.secondary">
//               Total Orders
//             </Typography>
//             <Typography variant="h4" sx={{ fontWeight: 700 }}>
//               {dashboard?.total_orders || 0}
//             </Typography>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 3, borderRadius: 3 }}>
//             <Typography variant="subtitle2" color="text.secondary">
//               Delivered Orders
//             </Typography>
//             <Typography variant="h4" sx={{ fontWeight: 700 }}>
//               {dashboard?.delivered_orders || 0}
//             </Typography>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 3, borderRadius: 3 }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Order Status
//             </Typography>

//             <PieChart
//               series={[
//                 {
//                   data: [
//                     { id: 0, value: dashboard?.delivered_orders || 0, label: "Delivered", color: "#4caf50" },
//                     {
//                       id: 1,
//                       value: (dashboard?.total_orders || 0) - (dashboard?.delivered_orders || 0),
//                       label: "Pending",
//                       color: "#9c35c5"
//                     }
//                   ]
//                 }
//               ]}
//               width={350}
//               height={250}
//             />
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 3, borderRadius: 3 }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Orders Overview
//             </Typography>

//             <BarChart
//               xAxis={[
//                 {
//                   scaleType: "band",
//                   data: ["Orders", "Delivered"]
//                 }
//               ]}
//               series={[
//                 {
//                   data: [
//                     dashboard?.total_orders || 0,
//                     dashboard?.delivered_orders || 0
//                   ],
//                   color: "#9c35c5"
//                 }
//               ]}
//               width={350}
//               height={250}
//             />
//           </Paper>
//         </Grid>

//       </Grid>

//     </Box>

//   </Box>
// );
// };

export default CustomerProfile;