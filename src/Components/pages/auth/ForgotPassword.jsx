import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../../../services/rtkQuery/authApi";
import { CardContent, Typography,Card,Stack,Box, TextField,Button } from "@mui/material";

const ForgotPassword = () => {

  const [error, setError] = useState("");

  const {register,handleSubmit,formState: { errors }} = useForm();

  const [forgotPassword] = useForgotPasswordMutation();

  const handlePassword = async (data) => {

    try {

      //const res = await API.post("/auth/forgot-password", data);
      const res = await forgotPassword(data).unwrap();
      console.log(res.data);
      alert("mail sent if existed")

    } catch (err) {
      console.error(err);
      setError("invalid email")
    }
  };

  return (
      <Box  sx={{ display: 'flex', justifyContent: 'center', mt: 18 }}>
        <Card sx={{ p: 2, borderRadius: 7, boxShadow: 4 }}>
          <CardContent >
          <Typography  variant="h5" align="center" fontWeight="bold">FORGET PASSWORD</Typography>

      <form onSubmit={handleSubmit(handlePassword)}>
        <Stack spacing={3} sx={{ mt: 2 }}>
    
        {error && <p className="error">{error}</p>}

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
    </Box>
  );
};

export default ForgotPassword;