import React, { useContext } from "react";
import useLogout from "../auth/Logout";
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from "@mui/material";
import { Storefront, ShoppingCart, GridView, Person, Search, Logout, Brightness4, Brightness7 } from "@mui/icons-material";
import CommonLayout from "../../layouts/CommonLayout";
import { useNavigate, Outlet } from "react-router-dom";
import { ColorModeContext } from "../../../theme/themeProvider";
import ThemeToggle from "../../../theme/themeToggle";

const CustomerLayout = () => {
    const navigate = useNavigate();
    const { mode, toggleTheme } = useContext(ColorModeContext);

    const menuItems = [
        { text: "Products", icon: <GridView/>, path: "/customer/catalog"},
        { text: "Orders", icon: <Storefront />, path: "/customer/orders" },
        { text: "Search", icon: <Search />, path: "/customer/search"},
        {  icon: <Person />, path: "/customer/customer-profile" },
        {  icon: <ShoppingCart />, path: "/customer/cart" },
    ];

    const handleNavigate = (path) => {
        navigate(path);
    };

    const { handleLogout } = useLogout();


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#6a04a0" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Ecommerce
                    </Typography>
                    <Box>
                        {menuItems.map((item) => (
                            <Button color="inherit" key={item.path} onClick={() => handleNavigate(item.path)}>
                                {item.icon}
                                {item.text}
                            </Button>
                        ))}
                        <ThemeToggle/>
                        <Button color="error" startIcon={<Logout/>} onClick={handleLogout} sx={{ ml: 2 }}>
                            Logout 
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>
        </Box>

    );
}

export default CustomerLayout;