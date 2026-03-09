import React, { useState } from "react";
import API from "../../../services/api";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {

  const [error, setError] = useState("");

  const {register,handleSubmit,formState: { errors }} = useForm();

  const handlePassword = async (data) => {

    try {

      const res = await API.post("/auth/forgot-password", data);
      console.log(res.data);
      alert("mail sent if existed")

    } catch (err) {
      console.error(err);
      setError("invalid email")
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(handlePassword)}>
        <h1>Forgot Password</h1>
    
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Enter email"
          {...register("email",{required:"emailisrequired"})}
        />

        <button type="submit">Send Reset Link</button>

        {errors.email && <p>{errors.email.message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;