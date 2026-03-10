import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation
} from "../../../services/sellerApi";

import {
  Box, Card, CardContent, Typography, Button, Stack, Dialog, 
  DialogTitle, DialogContent, DialogActions, TextField, Grid} from "@mui/material";

import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";



const Products = () => {

  const { data, error, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [open, setOpen] = useState(false);
  const [currentPid, setCurrentPid] = useState(null);

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

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

  const handleUpdate = (product) => {

    setCurrentPid(product.product_id);

    reset({
      product_category_name: product.product_category_name,
      product_weight_g: product.product_weight_g,
      product_height_cm: product.product_height_cm,
      product_length_cm: product.product_length_cm,
      product_width_cm: product.product_width_cm
    });

    setOpen(true);

  };

  const handleAdd=()=>{
    navigate("/add-product")
  };



  const onSubmit = async (formData) => {

    const user_id = localStorage.getItem("user_id");

    try {

      await updateProduct({
        sid: user_id,
        pid: currentPid,
        data: formData
      }).unwrap();

      setOpen(false);

    } catch (err) {

      console.error("Update failed", err);

    }

  };

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;
  if (!data) return <p>No data</p>;

  return (

    <Box sx={{ padding: 4 }}>

      <Typography variant="h4" mb={3}>
        Seller Products
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAdd}>Add Product</Button>
     <Grid container spacing ={3} justifyContent="center" alignItems="center">
        {data.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.product_id}>
        {/* <Card key={product.product_id} sx={{ mb: 3 }}> */}
        <Card>

          <CardContent>

            <Typography variant="h6">
              {product.product_category_name}
            </Typography>

            <Typography>Weight: {product.product_weight_g}</Typography>
            <Typography>Height: {product.product_height_cm}</Typography>
            <Typography>Length: {product.product_length_cm}</Typography>
            <Typography>Width: {product.product_width_cm}</Typography>

            <Stack direction="row" spacing={2} mt={2}>

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdate(product)}
              >
                Update
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(product.product_id)}
              >
                Delete
              </Button>

            </Stack>

          </CardContent>

        </Card>
</Grid>
      ))}
      </Grid>
      


      <Dialog open={open} onClose={() => setOpen(false)}>

        <DialogTitle>Update Product</DialogTitle>

        <DialogContent>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >

            <TextField
              label="Category"
              {...register("product_category_name")}
            />

            <TextField
              label="Weight"
              {...register("product_weight_g")}
            />

            <TextField
              label="Height"
              {...register("product_height_cm")}
            />

            <TextField
              label="Length"
              {...register("product_length_cm")}
            />

            <TextField
              label="Width"
              {...register("product_width_cm")}
            />

            <DialogActions>

              <Button onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button type="submit" variant="contained">
                Update
              </Button>

            </DialogActions>

          </Box>

        </DialogContent>

      </Dialog>

    </Box>
  );
};

export default Products;









// import React from "react";
// import { useGetProductsQuery } from "../../../services/sellerApi";

// const Products = () => {

//   const { data, error, isLoading } = useGetProductsQuery();

//   if (isLoading) {
//     return <p>Loading products...</p>;
//   }

//   if (error) {
//     return <p>Error loading products</p>;
//   }

//   if (!data) {
//     return <p>No data</p>;
//   }
//   console.log(data);

//     return (
//     <div>

//       <h2>Seller Products</h2>

//       {data.map((product) => (

//         <div key={product.product_id} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>

//           <h3>{product.product_category_name}</h3>
//           <p>ID: {product.product_id}</p>
//           <p>Weight: {product.product_weight_g}</p>
//           <p>Height: {product.product_height_cm}</p>
//           <p>Length: {product.product_length_cm}</p>
//           <p>Width: {product.product_width_cm}</p>

//         </div>

//       ))}

//     </div>
//   );
// };

// export default Products;