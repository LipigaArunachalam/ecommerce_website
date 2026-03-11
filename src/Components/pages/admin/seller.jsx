import { useState } from "react";
import { useForm } from "react-hook-form"
import { 
    useGetAllSellerQuery, 
    useDeleteSellerMutation, 
    useAddSellerMutation } from "../../../services/rtkQuery/adminApi";
import { 
    Card, 
    CardContent,
    Typography,
    Grid,
    Container,
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent, 
    TextField, 
    DialogActions } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'

const Sellers = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const [open, setOpen] =useState(false);

    const [deleteSeller] = useDeleteSellerMutation();
    const { data, isLoading, isError} = useGetAllSellerQuery({
        page,limit
    });
    const [addSeller, { isLoading: isAdding}] = useAddSellerMutation();

    const { 
        register, 
        reset, 
        handleSubmit, 
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: '', 
            email: '', 
            password: '', 
            city: '', 
            state: '', 
            zip_code: ''
        }
    })

    const handleClose = () =>{
        setOpen(false),
        reset()
    } 

    const onAddSellerSubmit = async (formData) => {
        try {
            const payload = {
                ...formData,
                zip_code:Number(formData.zip_code)
            }
            await addSeller(payload).unwrap();
            alert("Seller added successfully!");
            handleClose();
        } catch (err) {
            alert(err.data?.message || "Failed to add seller");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this seller?")) {
            try {
                await deleteSeller(id).unwrap();
                alert("seller Deleted");
            } catch (err) {
                console.log(err)
                 alert("failed to delete seller ")
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred while fetching seller.</div>;
     return (
        <Container maxWidth="lg" >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Sellers</Typography>
                <Box display="flex" gap={2}>
                    
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />} 
                        onClick={() => setOpen(true)}
                    >
                        Add Seller
                    </Button> 
                    <Box>
                        <Button 
                            disabled={page === 1} 
                            onClick={() => setPage((prev) => prev - 1)}
                        >
                            Previous
                        </Button>
                        <Button onClick={() => setPage((prev) => prev + 1)}>
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Grid container spacing={3}>
                {data?.map((seller) => (
                    <Grid item xs={12} sm={6} md={4} key={seller.id} >
                        <Card>
                            <CardContent >
                                <Typography variant="h6" component="div" gutterBottom>
                                    {seller.seller_name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    <strong>Email:</strong> {seller.seller_email}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    <strong>State:</strong> {seller.seller_state || 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    <strong>City:</strong> {seller.seller_city || "N/A"}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Zipcode:</strong> {seller.seller_zip_code || "N/A"}
                                </Typography>
                                
                            </CardContent>
                            <Box sx={{ p: 2, pt: 0 }}>
                                <Button 
                                    fullWidth
                                    variant="outlined" 
                                    color="error" 
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDelete(seller.id)}
                                    
                                >
                                    Delete Seller
                                </Button>
                            </Box>
                        </Card>
                        
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Add New Seller</DialogTitle>
                {/* 5. Wrap fields in a form or Box with handleSubmit */}
                <DialogContent 
                    component="form" 
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
                >
                    <TextField 
                        label="Username" 
                        fullWidth 
                        {...register("username", { required: "Username is required" })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField 
                        label="Email" 
                        type="email" 
                        fullWidth 
                        {...register("email", { 
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField 
                        label="Password" 
                        type="password" 
                        fullWidth 
                        {...register("password", { 
                            required: "Password is required",
                            minLength: { value: 6, message: "Min 6 characters" }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Box display="flex" gap={2}>
                        <TextField 
                            label="City" fullWidth 
                            {...register("city")} 
                        />
                        <TextField 
                            label="State" fullWidth 
                            {...register("state")} 
                        />
                    </Box>
                    <TextField 
                        label="Zipcode" fullWidth 
                        {...register("zip_code")} 
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button 
                        variant="contained" 
                        onClick={handleSubmit(onAddSellerSubmit)} // 6. Trigger validation and submit
                        disabled={isAdding}
                    >
                        {isAdding ? "Adding..." : "Confirm Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
     );
}

export default Sellers;