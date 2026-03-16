import React, { useState } from "react";
import ProductCardLayout from "../../layouts/ProductCardLayout";
import { useAddToCartMutation, useGetCatalogQuery } from "../../../services/rtkQuery/customerApi";
import { Box } from "@mui/material"
import BuyProductDialog from "./BuyProductDialog";
import ProductDetailsDialog from "./ProductDetailsDialog";

const Catalog = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { data, isLoading, error } = useGetCatalogQuery({
        page: page + 1,
        limit: rowsPerPage,
    });

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
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box>
            <ProductCardLayout
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
        </Box>
    );
};

export default Catalog;
