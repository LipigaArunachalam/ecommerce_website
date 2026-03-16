import React from "react";
import { useCartQuery, useRemoveFromCartMutation } from "../../../services/rtkQuery/customerApi";
import AdminTableLayout from "../../layouts/AdminTableLayout";
import { useState } from "react";
import {Stack, Button, Container}from "@mui/material"
import BuyProductDialog from "./BuyProductDialog";
import DeleteDialog from "../../dialogs/DeleteDialog";
import SnackBar from "../../../services/snackBar/snackBar";

const Cart = () => {
    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("success");



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
 

    const handleRemove = (pid) => {
        setSelectedProductId(pid);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmRemove = async () => {
        try {
            await remove({ uid: localStorage.getItem("user_id"), pid: selectedProductId }).unwrap();
            setSnackMessage("Item removed from cart");
            setSnackSeverity("success");
            setSnackOpen(true);
            setIsDeleteDialogOpen(false);
            setSelectedProductId(null);
        } catch (err) {
            console.error(err);
            setSnackMessage("Failed to remove item");
            setSnackSeverity("error");
            setSnackOpen(true);
        }
    };
    
    const handlePurchaseSuccess = async () => {
        if (selectedProduct) {
            try {
                // Silently remove from cart after purchase
                await remove({ uid: localStorage.getItem("user_id"), pid: selectedProduct.product_id }).unwrap();
            } catch (err) {
                console.error("Failed to remove item from cart after purchase:", err);
            }
        }
    };

    return(
        // <p>{JSON.stringify(data)}</p>
        <Container>
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
                onSuccess={handlePurchaseSuccess}
            />
            <DeleteDialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleConfirmRemove}
                title="Remove Item"
                description="Are you sure you want to remove this item from your cart?"
                confirmText="Remove"
                cancelText="Cancel"
            />
            <SnackBar
                open={snackOpen}
                message={snackMessage}
                severity={snackSeverity}
                handleClose={() => setSnackOpen(false)}
            />
         </Container>
    )

}


export default Cart;