import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../../services/api";
// import "./ResetPassword.css";

const ResetPassword = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/reset-password", {
        email,token,newPassword});

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      console.error(err);
      setMessage("Password reset failed");
    }
  };

  return (
    <div className="wrapper">

      <form onSubmit={handleSubmit}>

        <h1>Reset Password</h1>

        <div className="input-box">
          <input
            type="password"
            placeholder="Enter new password"
            required
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
          />
        </div>

        <button type="submit">
          Reset Password
        </button>

        {message && <p className="message">{message}</p>}

      </form>

    </div>
  );
};

export default ResetPassword;