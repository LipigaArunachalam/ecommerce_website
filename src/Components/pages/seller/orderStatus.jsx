import React from "react";
import { Typography, Button, Grid, CardContent, Box, Card, FormControl, InputLabel, MenuItem, Select,Paper,
  TableBody, TableContainer, Table, TableHead, TableRow, TableCell
 } from "@mui/material";
import { useOrderStatusQuery, useUpdateOrderStatusMutation } from "../../../services/rtkQuery/sellerApi";

const OrderStatus = () => {
  const { data, error, isLoading } = useOrderStatusQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();
  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products</p>;
  }

  if (!data) {
    return <p>No data</p>;
  }
  console.log(data);

  const handleStatusChange = async (orderId, event) => {
    const newStatus = event.target.value;
    try {
      await updateStatus({ oid: orderId, status: newStatus }).unwrap();
      console.log("Status updated!");
    } catch (err) {
      console.error("Failed to update status", err);
    }
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 6, borderRadius: 2 }}>
      <Table sx={{ minWidth: 800 }} aria-label="orders table">
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell><strong>Order ID</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Est. Delivery</strong></TableCell>
            <TableCell><strong>Payment</strong></TableCell>
            <TableCell><strong>Installation</strong></TableCell>
            <TableCell align="right"><strong>Price</strong></TableCell>
            <TableCell align="right"><strong>Freight</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product.order_id} hover>
              {/* Order ID with your custom blue styling */}
              <TableCell sx={{ color: "#1f77d0", fontWeight: "600" }}>
                {product.order_id}
              </TableCell>

              {/* Inline Status Dropdown */}
              <TableCell>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={product.order_status}
                    onChange={(e) => handleStatusChange(product.order_id, e)}
                    sx={{
                      color: "blue",
                      fontSize: '0.875rem',
                      ".MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,255,0.3)" }
                    }}
                  >
                    <MenuItem value="delivered">Delivered</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="canceled">Canceled</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>

              <TableCell>{product.estimated_delivery_date}</TableCell>
              <TableCell>{product.payment_type}</TableCell>
              <TableCell>{product.Installation}</TableCell>
              <TableCell align="right">${product.price}</TableCell>
              <TableCell align="right">${product.freight_value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderStatus;