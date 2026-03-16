import React, { useState } from "react";
import ProductCardLayout from "../../layouts/ProductCardLayout";
import { useAddToCartMutation, useGetCatalogQuery,useSearchProductQuery } from "../../../services/rtkQuery/customerApi";
import { Box } from "@mui/material"
import BuyProductDialog from "./BuyProductDialog";
import ProductDetailsDialog from "./ProductDetailsDialog";
// import { useNavigate } from "react-router-dom";
import SnackBar from './../../../services/snackBar/snackBar'


const Catalog = ({searchTerm}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("error");



    const { data, isLoading, error } = useGetCatalogQuery({
        page: page + 1,
        limit: rowsPerPage,
    });

    const { data:searchdata } = useSearchProductQuery({prod:searchTerm,page: page + 1,
        limit: rowsPerPage},{ skip: !searchTerm });

    const [addToCart] = useAddToCartMutation();

    const handleBuy = (product) => {
        setSelectedProduct(product);
        setIsBuyDialogOpen(true);
    };

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setIsDetailsDialogOpen(true);
    };

    const handleAddToCart = async (product_id) => {
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

    const displayData = searchTerm ? searchdata : data;

    return (
        <Box>
            <ProductCardLayout
                data={displayData || []}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                isLoading={isLoading}
                isError={!!error}
                onCardClick={handleCardClick}
            />

            <ProductDetailsDialog
                open={isDetailsDialogOpen}
                onClose={() => setIsDetailsDialogOpen(false)}
                product={selectedProduct}
                onAddToCart={handleAddToCart}
                onBuy={handleBuy}
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
