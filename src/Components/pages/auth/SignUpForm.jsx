import React, { useState } from "react";
// import "./SignUpForm.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import API from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      const res = await API.post("/auth/signup", { email, username, password, zip_code, city, state });

      console.log("Signup success:", res.data);

      alert("Signup successful");

      navigate("/");

    } catch (err) {

      console.error(err);
      setError("Signup failed");

    }
  };

  return (
    <div className="wrapper">

      <form onSubmit={handleSignup}>

        <h1>Sign Up</h1>

        {error && <p className="error">{error}</p>}

        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <FaUser className="icon"/>
        </div>

        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <FaEnvelope className="icon"/>
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <FaLock className="icon"/>
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />
          <FaLock className="icon"/>
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Zip Code"
            required
            value={zip_code}
            onChange={(e)=>setZipCode(e.target.value)}
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="City"
            required
            value={city}
            onChange={(e)=>setCity(e.target.value)}
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="State"
            required
            value={state}
            onChange={(e)=>setState(e.target.value)}
          />
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