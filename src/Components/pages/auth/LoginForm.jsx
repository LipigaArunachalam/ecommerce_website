import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import API from "../../../services/api";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const LoginForm = () => {

  const [error, setError] = useState("");

  const {register,handleSubmit,formState: { errors }} = useForm();

  const onSubmit = async (data) => {

    try {

      const res = await API.post("/auth/login", data);

      console.log("Login success:", res.data);

      alert("Login successful");

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

        <button type="submit">Login</button>

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