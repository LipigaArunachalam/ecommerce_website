import React, { useState } from "react";
import { useGetAdminQuery, useSearchUserQuery } from "../../../services/rtkQuery/adminApi";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Alert,
    Stack,
    Divider
} from "@mui/material";
import { Search } from "@mui/icons-material";

const AdminDashboard = () => {
    const { data: adminData } = useGetAdminQuery();
    const [ page, setPage] = useState(1);
    const limit = 20;
    const [city, setCity] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { data: searchResults, isFetching, error } = useSearchUserQuery(
        {city: searchTerm, page, limit}, {
        skip: !searchTerm,
    });
    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim()) {
            setSearchTerm(city.trim());
            setPage(1)
        }
    };
    
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                fontStyle="italic"
                textTransform="capitalize"
                gutterBottom
                color="primary"
            >
                Welcome {adminData?.username}
            </Typography>
            <Divider sx={{ mb: 4 }} />
            {/* Search Section */}
            <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                    Search Customers and Sellers 
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSearch}
                    sx={{ display: "flex", gap: 2, mt: 2 }}
                >
                    <TextField
                        fullWidth
                        label="Enter "
                        variant="outlined"
                        size="small"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        startIcon={isFetching ? <CircularProgress size={20} color="inherit" /> : <Search />}
                        type="submit"
                        disabled={isFetching || !city.trim()}
                    >
                        Search
                    </Button>
                </Box>
            </Paper>
            {/* Results Section */}
            
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    An error occurred while searching. Please try again.
                </Alert>
            )}
            {searchTerm && !isFetching && searchResults?.length === 0 && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    No users found in "{searchTerm}".
                </Alert>
            )}
            {searchResults && searchResults.length > 0 && (
                <Stack spacing={4}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2}>
                            <Button 
                                variant="outlined" 
                                disabled={page === 1 || isFetching} 
                                onClick={() => setPage(prev => prev - 1)}
                            >
                                Previous
                            </Button>
                            <Button 
                                variant="outlined" 
                                disabled={ isFetching} 
                                onClick={() => setPage(prev => prev + 1)}
                            >
                                Next
                            </Button>
                        </Stack>
                    </Box>
                    {searchResults.map((group) => (
                        <Box key={group._id}>
                            <Typography variant="h6" color="primary" gutterBottom sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                                {group._id}s ({group.count})
                            </Typography>
                            <TableContainer component={Paper} elevation={1}>
                                <Table>
                                    <TableHead sx={{ bgcolor: 'grey.100' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {group.users.map((user, index) => (
                                            <TableRow key={index} hover>
                                                <TableCell>{user.username}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell sx={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    ))}
                    
                </Stack>
            )}

            {isFetching && (
                <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                </Box>
            )}
        </Container>
    );
}

export default AdminDashboard;
