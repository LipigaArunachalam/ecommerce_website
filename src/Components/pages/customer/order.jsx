import React from "react";
import AdminTableLayout from "../../layouts/AdminTableLayout";
import { useState } from "react";
import { useGetAllProductsQuery } from "../../../services/rtkQuery/customerApi";

const Order = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const uid= localStorage.getItem("user_id");

    const { data, isLoading, error } = useGetAllProductsQuery({
        page: page + 1,
        limit: rowsPerPage,
        uid: uid,
    });

    const columns = [
        {
            key: "order_id",
            label: "Order ID",
            render: (row) => (
                <span style={{ color: "#1f77d0", fontWeight: 600 }}>
                    {row.order_id}
                </span>
            )
        },
        {
            key: "product_name",
            label: "Category"
        },
        {
            key: "Product_img",
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
            key: "order_at",
            label: "Ordered At"
        },
        {
            key: "product_price",
            label: "Product Price"
        },
        {
            key: "freight_value",
            label: "Freight value"
        },
        {
            key: "total_price",
            label: "Price",
        },
        {
            key: "status",
            label: "Status"
        },
        {
            key: "payment_type",
            label: "Payment"
        },
        {
            key: "Installation",
            label: "Installation"
        },
        {
            key: "estimated_delivery",
            label: "Est. Delivery"
        },
    ]

    return (
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
    );

}


export default Order;