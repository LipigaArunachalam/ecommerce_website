
import { useGetAllCustomerQuery } from "../../../services/api";
import { Card, CardContent, Typography, Grid, Container, Button } from "@mui/material";
import { useState } from "react";

const Customers = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const { data, isLoading, isError } = useGetAllCustomerQuery({
        page,
        limit
    });
    console.log(data);
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred while fetching customers.</div>;

    return (
        <Container maxWidth="lg" style={{  }}>
            <h2>Customers</h2>
            <Button variant="contained" onClick={() => setPage((prev) => prev + 1)}>Next Page</Button>
            <Button variant="contained" onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous Page</Button>
            <Grid container spacing={3}>
                {data?.map((customer) => (
                    <Grid item xs={12} sm={6} md={4} key={customer._id} >
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {customer.customer_name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    <strong>Email:</strong> {customer.customer_email}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    <strong>State:</strong> {customer.customer_state || 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    <strong>City:</strong> {customer.customer_city || "N/A"}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Zipcode:</strong> {customer.customer_zip_code || "N/A"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Customers;