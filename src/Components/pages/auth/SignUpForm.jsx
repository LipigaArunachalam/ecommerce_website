import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../../../services/rtkQuery/authApi";

const SignUpForm = () => {

  const navigate = useNavigate();
  
  const [error, setError] = useState("");

  const {register,handleSubmit,formState: { errors }} = useForm();

  const [signup] = useSignupMutation();

  const handleSignup = async (data) => {

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await signup(data).unwrap();

      console.log("Signup success:", res.data);

      alert("Signup successful");

      navigate("/products");

    } catch (err) {

      console.error(err);
      setError("Signup failed");

    }
  };

  return (
    <div className="wrapper">

      <form onSubmit={handleSubmit(handleSignup)}>

        <h1>Sign Up</h1>

        {error && <p className="error">{error}</p>}

        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            {...register("username" , {required:"username is required"})}
          />
          <FaUser className="icon"/>
           {errors.username && <p className="error">{errors.username.message}</p>}
        </div>

        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            {...register("email",{required:"email is required"})}
          />
          <FaEnvelope className="icon"/>
           {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            {...register("password",{required:"password is required"})}
          />
          <FaLock className="icon"/>
           {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword",{required:"password is required"})}
          />
          <FaLock className="icon"/>
           {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Zip Code"
            {...register("zip_code",{required:"zip code is required"})}
          />
           {errors.zip_code && <p className="error">{errors.zip_code.message}</p>}
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="City"
            {...register("city",{required: "city is required"})}
          />
           {errors.city && <p className="error">{errors.city.message}</p>}
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="State"
            {...register("state",{required:"state is required"})}
          />
           {errors.state && <p className="error">{errors.state.message}</p>}
        </div>

        <button type="submit">Sign Up</button>

        <div className="login-link">
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>

      </form>

    </div>
  );
};

export default SignUpForm;