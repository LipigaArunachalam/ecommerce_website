import React from "react";
import { useGetCatalogQuery } from "../../../services/rtkQuery/customerApi";
import { Box, Card, CardContent, Typography, Button, Stack, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Catalog = () => {

    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data, error, isLoading } = useGetCatalogQuery({
        page: page + 1, 
        limit: rowsPerPage,
    });

    const navigate = useNavigate();

    const handleCart = (product) => {
        console.log(product)
        navigate("/add-product")
    };


    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>Error loading products</p>;
    if (!data) return <p>No data</p>;

    return (

        <Box sx={{ padding: 4 }}>
            <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
                <Typography variant="h4" mb={3}  >
                    catalog
                </Typography>
            </Box>

            <Grid container spacing={3} justifyContent="center" alignItems="center" >
                {data.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.product_id}>
                        <Card sx={{ boxShadow: 6 }}>

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
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleCart(product)}
                                    >
                                        Add to Cart
                                    </Button>


                                </Stack>

                            </CardContent>

                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Box>
    );
};

export default Catalog;

