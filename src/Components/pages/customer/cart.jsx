import React from "react";
import { useCartQuery, useRemoveFromCartMutation } from "../../../services/rtkQuery/customerApi";
import AdminTableLayout from "../../layouts/AdminTableLayout";
import { useState } from "react";
import {Stack, Button, Box}from "@mui/material"
import BuyProductDialog from "./BuyProductDialog";

const Cart = () => {
    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [remove] = useRemoveFromCartMutation();

    const { data, isLoading, error } = useCartQuery({
        page: page + 1,
        limit: rowsPerPage,
    });
    

    const columns = [
        {
          key: "product_category_name",
          label: "product category"
        },
        {
          key: "product_image_url",
          label: "Image",
          render: (row) => (
            <img
              src={row.product_image_url}
              alt="product"
              style={{ height: "100px", width: "100px", objectFit: "cover" }}
            />
          )
        },
        {
          key:"price",
          label :"Price"
        },
        {
          key: "product_weight_g",
          label: "Weight"
        },
        {
          key: "product_height_cm",
          label: "Height"
        },
        {
          key: "product_width_cm",
          label: "Width"
        },
        {
          key: "product_qty",
          label: "Stock"
        },
        {
          key: "actions",
          label: "Actions",
          render: (row) => (
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button size="small" variant="outlined" color="error" onClick={(()=>handleRemove(row.product_id))}>Remove from cart</Button>
              <Button size="small" variant="outlined" color="primary" onClick={() => handleBuy(row)}>Buy</Button>
            </Stack>
          )
        }
      ];

    const handleBuy = (product) => {
        setSelectedProduct(product);
        setIsBuyDialogOpen(true);
    };

    const handleRemove=async(pid)=>{
      try{
        await remove({uid: localStorage.getItem("user_id"),pid:pid})
      }
        catch(err){
          console.error(err)
        }
    }
    
    if (isLoading) {
        return <p>Loading profile...</p>;
    }
    if (error) {
        return <p>Error loading profile</p>;
    }
    if (!data) {
        return <p>No data</p>;
    }
    return(
        // <p>{JSON.stringify(data)}</p>
        <Box>
        <AdminTableLayout
                // title="Products"
                columns={columns}
                data={data || []}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
                isLoading={isLoading}
                isError={!!error}
                getRowId={(row) => row.product_id}
              />
              <BuyProductDialog
                open={isBuyDialogOpen}
                onClose={() => setIsBuyDialogOpen(false)}
                product={selectedProduct}
            />
            </Box>
    )

}


export default Cart;