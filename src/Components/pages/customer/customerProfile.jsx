import React from "react";
import { useCustomerDetailsQuery } from "../../../services/rtkQuery/customerApi";
import { Email, LocationOn, Home,Map } from "@mui/icons-material";

const CustomerProfile = () => {

  const { data, error, isLoading } = useCustomerDetailsQuery();

  const fields = [
    { icon: <Email color="primary" />, label: "Email Address", value: data?.email },
    { icon: <LocationOn color="primary" />, label: "City", value: data?.city },
    { icon: <Map color="primary" />, label: "State", value: data?.state },
    { icon: <Home color="primary" />, label: "Zip Code", value: data?.zip_code },
  ];

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
    <ProfileLayout
          data={data}
          isLoading={isLoading}
          isError={!!error}
          fields={fields}/>
  );
};

export default CustomerProfile;