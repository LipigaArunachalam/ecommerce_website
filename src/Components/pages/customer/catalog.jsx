import React, { useState } from "react";
import AdminTableLayout from "../../layouts/AdminTableLayout";
import { useAddToCartMutation, useGetCatalogQuery } from "../../../services/rtkQuery/customerApi";
import { Box, Stack, Button } from "@mui/material"
import BuyProductDialog from "./BuyProductDialog";
// import { useNavigate } from "react-router-dom";
import SnackBar from './../../../services/snackBar/snackBar'


const Catalog = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("error");

    // const navigate= useNavigate();

    const { data, isLoading, error } = useGetCatalogQuery({
        page: page + 1,
        limit: rowsPerPage,
    });

    const [addToCart] = useAddToCartMutation();


    const columns = [
        {
            key: "product_category_name",
            label: "Product Category"
        },
        {
            key: "product_name",
            label: "Product Name"
        },
        {
            key: "product_image_url",
            label: "Image",
            render: (row) => (
                row.product_image_url ? (
                    <img
                        src={row.product_image_url}
                        alt="-"
                        style={{ height: "100px", width: "100px", objectFit: "cover" }}
                    />
                ) : (
                    <span>-</span>
                )
            )
        },
        {
            key: "price",
            label: "Price"
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
                    <Button size="small" variant="outlined" onClick={() => handleCart(row.product_id)}>Cart</Button>
                    <Button size="small" variant="outlined" onClick={() => handleBuy(row)}>Buy</Button>
                </Stack>
            )
        }
    ];

    const handleBuy = (product) => {
        setSelectedProduct(product);
        setIsBuyDialogOpen(true);
    };

    const handleCart = async (product_id) => {
        const uid = localStorage.getItem("user_id")
        try {
            await addToCart({ uid: uid, pid: product_id })
            // navigate("/customer/cart")
            setSnackMessage("Added to cart");
            setSnackSeverity("success")
            setSnackOpen(true)
        } catch (err) {
            console.error(err);
            setSnackMessage("Failed to add");
            setSnackSeverity("error")
            setSnackOpen(true)
        }
    };




    return (
        <Box>
            <AdminTableLayout
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
            <SnackBar
                open={snackOpen}
                message={snackMessage}
                severity={snackSeverity}
                handleClose={() => setSnackOpen(false)}
            />
        </Box>
    );
};

export default Catalog;