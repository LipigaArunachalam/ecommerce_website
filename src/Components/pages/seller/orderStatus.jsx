import React from "react";
import { Typography,Button,Grid,CardContent,Box,Card,FormControl,InputLabel,MenuItem,Select } from "@mui/material";
import { useOrderStatusQuery,useUpdateOrderStatusMutation } from "../../../services/sellerApi";

const OrderStatus=()=>{
    const {data,error,isLoading} = useOrderStatusQuery();
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

    const handleStatusChange=async(orderId, event)=>{
      const newStatus = event.target.value;
    try {
      await updateStatus({ oid: orderId, status: newStatus }).unwrap();
      console.log("Status updated!");
    } catch (err) {
      console.error("Failed to update status", err);
    }
    }

  return(
    <Box>
      <Typography>Order Status</Typography>
      <Grid container spacing ={3} justifyContent="center" alignItems="center">
        {data.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.product_id}>
        <Card>

          <CardContent>

            {/* <Typography variant="h6">
              {product.product_category_name}
            </Typography> */}

            {/* <Typography sx={{ fontWeight: 'bold' }}>order_status: {product.order_status}</Typography> */}
            <Typography variant="h6" mb={2}>Order ID: {product.order_id}</Typography>
                
                <FormControl sx={{ mt: 2, mb: 2 }}>
                  <InputLabel>Order Status</InputLabel>
                  <Select
                    value={product.order_status} 
                    label="Order Status"
                    onChange={(e) => handleStatusChange(product.order_id, e)}
                  >
                    <MenuItem value="delivered">Delivered</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="canceled">Canceled</MenuItem>
                  </Select>
                </FormControl>
            <Typography>estimated_delivery_date: {product.estimated_delivery_date}</Typography>
            <Typography>payment_type: {product.payment_type}</Typography>
            <Typography>Installation: {product.Installation}</Typography>
            <Typography>freight_value: {product.freight_value}</Typography>
            <Typography>product_id: {product.product_id}</Typography>
            <Typography>seller_id: {product.seller_id}</Typography>
            <Typography>order_id: {product.order_id}</Typography>


          </CardContent>

        </Card>
    </Grid>
      ))}
    </Grid>
    </Box>
  );
}

export default OrderStatus;