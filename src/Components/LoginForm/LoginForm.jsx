import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import API from "../../services/api";
import { Link } from "react-router-dom";

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      console.log("Login success:", res.data);

      alert("Login successful");

    } catch (err) {

      console.error(err);
      setError("Invalid email or password");

    }
  };

  return (
    <div className="wrapper">

      <form onSubmit={handleLogin}>

        <h1>Login</h1>

        {error && <p className="error">{error}</p>}

        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <FaUser className="icon"/>
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

        <div className="remember-forget">

          <label>
            <input type="checkbox"/> Remember me
          </label>

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