import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../../services/rtkQuery/authApi";
import { Button, Card, CardContent, Stack, Typography, Link as MuiLink, TextField, Box } from "@mui/material";
import  SnackBar  from './../../../services/snackBar/snackBar'

const LoginForm = () => {

  // const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [login] = useLoginMutation();
  const navigate = useNavigate();


  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("error");

  const onSubmit = async (data) => {

    try {

      const res = await login(data).unwrap();
      localStorage.setItem("email", res.user.email);
      localStorage.setItem("role", res.user.role);
      localStorage.setItem("user_id", res.user.user_id);
      const role = res.user.role;

      console.log("Login success:", res);
      setSnackMessage("login successfull")
      setSnackSeverity("success")
      setSnackOpen(true);

      setTimeout(()=>{
        if (role === "seller") {
        navigate("/seller/seller-profile");
      }
      if (role === "customer") {
        navigate("/customer/customer-profile");
      }
      if (role === "admin") {
        navigate("/admin");
      }
      }, 1000);

    } catch (err) {

      console.error(err);
      // setError("Invalid email or password");
      setSnackMessage("login failed")
      setSnackSeverity("error")
      setSnackOpen(true);

    }

  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <Card sx={{ p: 2, borderRadius: 7, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4" align="center" fontWeight="bold">LOGIN</Typography>

          {/* {error && <Typography color="error" align="center">{error}</Typography>} */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ mt: 2 }}>

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <Box sx={{ textAlign: 'right' }}>
                <MuiLink component={Link} to="/forgot-password" variant="body2">
                  Forgot Password?
                </MuiLink>
              </Box>

              <Button
                variant="contained"
                type="submit"
                size="large"
                fullWidth
                sx={{ py: 1.5, borderRadius: 2 }}>  Login
              </Button>


              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <MuiLink component={Link} to="/signup" fontWeight="bold">
                  Signup
                </MuiLink>
              </Typography>

            </Stack>
          </form>
        </CardContent>

      </Card>
      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={() => setSnackOpen(false)}
      />
    </Box>

  );
};

export default LoginForm;