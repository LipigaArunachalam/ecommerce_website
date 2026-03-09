import React, { useState } from "react";
import API from "../../../services/api";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/forgot-password", {
        email
      });

      setMessage(res.data.message);

    } catch (err) {
      console.error(err);
      setMessage("Failed to send reset email");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button type="submit">Send Reset Link</button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;