import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../../services/rtkQuery/authApi";
import { Button } from "@mui/material";

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
    <div className="wrapper">

      <form onSubmit={handleSubmit(onSubmit)}>

        <h1>Login</h1>

        {error && <p className="error">{error}</p>}

        <div className="input-box">

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />

          <FaUser className="icon"/>

          {errors.email && <p className="error">{errors.email.message}</p>}

        </div>

        <div className="input-box">

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />

          <FaLock className="icon"/>

          {errors.password && <p className="error">{errors.password.message}</p>}

        </div>

        <div className="remember-forget">

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

        </div>

        {/* <button type="submit">Login</button> */}
        <Button variant="contained" type="submit">Login</Button>

        <div className="register-link">
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>

      </form>

    </div>
  );
};

export default LoginForm;