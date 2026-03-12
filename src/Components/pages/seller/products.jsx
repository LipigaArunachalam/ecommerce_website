import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation // 1. Import Add Mutation
} from "../../../services/rtkQuery/sellerApi";

import {
  Box, Typography, Button, Stack, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Paper,
  TableBody, TableContainer, Table, TableHead, TableRow, TableCell
} from "@mui/material";

import { useForm } from "react-hook-form";


const Products = () => {
  const { data} = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [addProduct] = useAddProductMutation();

  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPid, setCurrentPid] = useState(null);

  const { register, handleSubmit, reset,formState: { errors } } = useForm();
  const [urlImg, setUrlImg]=useState();

  const handleUpdate = (product) => {
    setIsEditMode(true);
    setCurrentPid(product.product_id);
    reset(product);
    setOpen(true);
  };

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentPid(null);
    reset({
      product_category_name: "",
      product_weight_g: "",
      product_height_cm: "",
      product_length_cm: "",
      product_width_cm: "",
      product_photos_qty: ""
    });
    setOpen(true);
  };

  const handleDelete = async (pid) => {
    const user_id = localStorage.getItem("user_id");
    try {
      await deleteProduct({
        sid: user_id,
        pid: pid
      }).unwrap();
      console.log("Deleted product:", pid);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleFileUpload=async (e)=>{
    const file = e.target.files[0];
    console.log(file);
    if(!file) return ;
    const data =new FormData()
    data.append("file",file)
    data.append("upload_preset","Ecommerce")
    data.append("cloud_name","dyrw2esoq")
    const res =await fetch("https://api.cloudinary.com/v1_1/dyrw2esoq/image/upload",{
      method:"POST",
      body:data
    });
    const uploaded= await res.json();
    setUrlImg(uploaded.secure_url)
    console.log(uploaded.secure_url)
  }


  const onSubmit = async (formData) => {
    const user_id = localStorage.getItem("user_id");
    try {
      if (isEditMode) {

        await updateProduct({
          sid: user_id,
          pid: currentPid,
          data: {...formData,product_image_url:urlImg}
        }).unwrap();
        setUrlImg("");
      } else {
        console.log({...formData,product_image_url:urlImg})
        await addProduct({
          sid: user_id,
          data: {...formData,product_image_url:urlImg}
        }).unwrap();
        setUrlImg("");
      }
      setOpen(false);

    } catch (err) {
      console.error("Operation failed", err);
    }
  };


  return (
    <Box sx={{ padding: 4 }}>
      <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell align="right"><strong>Weight</strong></TableCell>
              <TableCell align="right"><strong>Height</strong></TableCell>
              <TableCell align="right"><strong>Length</strong></TableCell>
              <TableCell align="right"><strong>Width</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((product) => (
              <TableRow key={product.product_id} hover>
                <TableCell>{product.product_category_name}</TableCell>
                <TableCell align="right"><img src={product.product_image_url} height="100px" width="100px"></img></TableCell>
                <TableCell align="right">{product.product_weight_g}</TableCell>
                <TableCell align="right">{product.product_height_cm}</TableCell>
                <TableCell align="right">{product.product_length_cm}</TableCell>
                <TableCell align="right">{product.product_width_cm}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button size="small" variant="outlined" onClick={() => handleUpdate(product)}>Edit</Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(product.product_id)}>Delete</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEditMode ? "Update Product" : "Add New Product"}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField label="Category" {...register("product_category_name", { required: "Category is required" })} disabled={isEditMode} 
              error={!!errors.product_category_name}
              helperText={errors.product_category_name?.message} />

            <TextField label="Weight" type="number" {...register("product_weight_g", { required: "Weight is required" })} required
            error={!!errors.product_weight_g}
              helperText={errors.product_weight_g?.message} />

            <TextField label="Height" type="number" {...register("product_height_cm", { required: "Height is required" })} required
            error={!!errors.product_height_cm}
              helperText={errors.product_height_cm?.message} />
              
            <TextField label="Length" type="number" {...register("product_length_cm", { required: "Length is required" })} required 
            error={!!errors.product_length_cm}
              helperText={errors.product_length_cm?.message}/>

            <TextField label="Width" type="number" {...register("product_width_cm", { required: "Width is required" })} required
            error={!!errors.product_width_cm}
              helperText={errors.product_width_cm?.message} />

            <TextField label="Photos Quantity" type="number" {...register("product_photos_qty", { required: "Photo qty is required" })} required
            error={!!errors.product_photos_qty}
              helperText={errors.product_photos_qty?.message} />

            <TextField type="file" onChange={handleFileUpload}/>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {isEditMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;