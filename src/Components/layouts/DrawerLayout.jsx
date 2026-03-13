import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const DrawerLayout = ({ title, menuItems, handleLogout, isDesktop, handleDrawerToggle }) => {
  return (
    <div>
      <Toolbar>
        <Typography variant="h6" color="primary" fontWeight="bold" noWrap>
          {title}
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: "auto", display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                // Close drawer on click for mobile
                onClick={!isDesktop ? handleDrawerToggle : undefined}
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
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <Logout color="error" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default DrawerLayout;
