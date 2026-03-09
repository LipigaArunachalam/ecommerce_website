import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../../services/api";
import { useForm } from "react-hook-form";


const ResetPassword = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [error,setError] = useState("");

  const {register,handleSubmit, formState:{errors}}= useForm();

  const handleReset = async (data) => {

    try {
      const res = await API.post("/auth/reset-password", {newPassword:data.newPassword,email,token});

      alert("password reset successfully");
      console.log(res);
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      console.error(err);
      setError("Password reset failed");
    }
  };

  return (
    <div className="wrapper">

      <form onSubmit={handleSubmit(handleReset)}>

        <h1>Reset Password</h1>

        {error && <p className="error">{error}</p>}

        <div className="input-box">
          <input
            type="password"
            placeholder="Enter new password"
            {...register("newPassword",{required:"password is needed"})}
          />
        </div>

        <button type="submit">
          Reset Password
        </button>

        {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}

      </form>

    </div>
  );
};

export default ResetPassword;