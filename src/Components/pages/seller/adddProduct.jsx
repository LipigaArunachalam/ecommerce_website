import React from "react";
import { useAddProductMutation } from "../../../services/sellerApi";
import { Box, Typography, Button, TextField, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [addProduct] = useAddProductMutation();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const user_id = localStorage.getItem("user_id");
    try {
      await addProduct({
        sid: user_id,
        data: formData,
      }).unwrap();

      navigate("/products");
    } catch (err) {
      console.error("Failed to add product", err);
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: "auto" }}>
      <Paper sx={{ padding: 3}}>
        <Typography variant="h5" mb={3}>Add New Product</Typography>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Category Name" {...register("product_category_name")} required />
          <TextField label="Weight (g)" type="number" {...register("product_weight_g")} />
          <TextField label="Height (cm)" type="number" {...register("product_height_cm")} />
          <TextField label="Length (cm)" type="number" {...register("product_length_cm")} />
          <TextField label="Width (cm)" type="number" {...register("product_width_cm")} />
          <TextField label="photos qty" type="number" {...register("product_photos_qty")} />
          
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button variant="outlined" onClick={() => navigate("/seller/products")}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Add Product</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddProduct;