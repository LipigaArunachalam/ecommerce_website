import React from "react";
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Divider, 
  Box, 
  Typography 
} from "@mui/material";
import { 
  Dashboard, 
  Inventory, 
  Storefront, 
  People, 
  ShoppingCart, 
  Logout 
} from "@mui/icons-material";
import { Outlet, NavLink } from "react-router-dom";

const drawerWidth = 260;

const SellerLayout = () => {
  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/seller-profile" },
    // { text: "Products", icon: <Inventory />, path: "/admin/products" },
    { text: "Inventory", icon: <Storefront />, path: "/products" },
    // { text: "Add Product", icon: <People />, path: "/add-product" },
    { text: "Orders", icon: <ShoppingCart />, path: "/order-status" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Seller Panel
          </Typography>
        </Toolbar>
        <Divider />
        
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  component={NavLink} 
                  to={item.path}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#f0f7ff" : "transparent",
                    color: isActive ? "#1976d2" : "inherit",
                  })}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          <Divider sx={{ my: 1 }} />
          
          <List>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/login">
                <ListItemIcon><Logout color="error" /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          backgroundColor: "#f9f9f9", 
          minHeight: "100vh" 
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default SellerLayout;