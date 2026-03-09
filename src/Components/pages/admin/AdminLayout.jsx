// import { Drawer } from "@mui/material"
// import { Outlet } from "react-router-dom"


// export const AdminLayout = () =>{
//     return (
//         <div style={{ display: "flex" }}>
//             <Drawer variant="permanent" anchor="left">
//                 <div style={{ width: 250, padding: 20 }}>
//                     <h3>Admin Menu</h3>
//                     <ul style={{ listStyle: "none", padding: 0 }}>
//                         <li><a href="/admin">Dashboard</a></li>
//                         <li><a href="/admin/products">Products</a></li>
//                         <li><a href="/admin/sellers">Sellers</a></li>
//                         <li><a href="/admin/customers">Customers</a></li>
//                         <li><a href="/admin/orders">Orders</a></li>
//                         <li><a href="/login">logout</a></li>
//                     </ul>
//                 </div>
//             </Drawer>
//             <div style={{ flex: 1, padding: 20 }}>
//                 <Outlet />
//             </div>
//         </div>

//     )
// }

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

export const AdminLayout = () => {
  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
    { text: "Products", icon: <Inventory />, path: "/admin/products" },
    { text: "Sellers", icon: <Storefront />, path: "/admin/sellers" },
    { text: "Customers", icon: <People />, path: "/admin/customers" },
    { text: "Orders", icon: <ShoppingCart />, path: "/admin/orders" },
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
            Admin Panel
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

      {/* Main Content Area */}
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