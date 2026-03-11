import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../../services/rtkQuery/authApi";
import { Button,Card, CardContent,Stack,Typography,Link as MuiLink,TextField,Box } from "@mui/material";

const LoginForm = () => {

  const [error, setError] = useState("");

  const {register,handleSubmit,formState: { errors }} = useForm();

  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {

    try {

      //const res = await API.post("/auth/login", data);
      const res = await login(data).unwrap();
      localStorage.setItem("email", res.user.email);
      localStorage.setItem("role", res.user.role);
      localStorage.setItem("user_id", res.user.user_id);

      console.log("Login success:", res);

      alert("Login successful");
      if(localStorage.getItem("role")==="seller"){
         navigate("/seller-profile");
      }
      if(localStorage.getItem("role")==="customer"){
         navigate("/customer-profile");
      }
      if(localStorage.getItem("role")==="admin"){
         navigate("/seller-profile");
      }
     

    } catch (err) {

      console.error(err);
      setError("Invalid email or password");

    }

  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 18 }}>
      <Card sx={{ p: 2, borderRadius: 7, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4" align="center" fontWeight="bold">LOGIN</Typography>

          {error && <Typography color="error" align="center">{error}</Typography>}

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
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                Login
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
    </Box>
  );
};

export default LoginForm;