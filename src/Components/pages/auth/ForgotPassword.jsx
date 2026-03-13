import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../../../services/rtkQuery/authApi";
import { CardContent, Typography,Card,Stack,Box, TextField,Button } from "@mui/material";
import  SnackBar  from './../../../services/snackBar/snackBar'
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  // const [error, setError] = useState("");

  const {register,handleSubmit,formState: { errors }} = useForm();

  const [forgotPassword] = useForgotPasswordMutation();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("error");

  const navigate = useNavigate();

  const handlePassword = async (data) => {

    try {

      //const res = await API.post("/auth/forgot-password", data);
      const res = await forgotPassword(data).unwrap();
      console.log(res.data);
      // alert("mail sent if existed")
      setSnackMessage("Mail sentif existed")
      setSnackSeverity("info")
      setSnackOpen(true)
      setTimeout(()=>{
        navigate("/")
      },1000)
      

    } catch (err) {
      console.error(err);
      // setError("invalid email")
      setSnackMessage("Invalid mail")
      setSnackSeverity("error")
      setSnackOpen(true)
    }
  };

  return (
      <Box  sx={{ display: 'flex', justifyContent: 'center', mt: 18 }}>
        <Card sx={{ p: 2, borderRadius: 7, boxShadow: 4 }}>
          <CardContent >
          <Typography  variant="h5" align="center" fontWeight="bold">FORGET PASSWORD</Typography>

      <form onSubmit={handleSubmit(handlePassword)}>
        <Stack spacing={3} sx={{ mt: 2 }}>
    
        {/* {error && <p className="error">{error}</p>} */}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <Button variant="contained" type="submit" fullWidth
                sx={{ py: 1.5, borderRadius: 2 }}>Send Reset Link</Button>

        {errors.email && <p>{errors.email.message}</p>}
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

export default ForgotPassword;