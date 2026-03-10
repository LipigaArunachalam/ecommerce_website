import React from "react";
import { useGetSellerDetailsQuery } from "../../../services/sellerApi";

const Profile = () => {

  const { data, error, isLoading } = useGetSellerDetailsQuery();

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error loading profile</p>;
  }

  if (!data) {
    return <p>No data</p>;
  }

  return (
    <div>
      <h2>Welcome {data.username}</h2>
      <p>Email: {data.email}</p>
      <p>Role: {data.role}</p>
      <p>City: {data.city}</p>
      <p>State: {data.state}</p>
      <p>Zip Code: {data.zip_code}</p>
    </div>
  );
};

export default Profile;