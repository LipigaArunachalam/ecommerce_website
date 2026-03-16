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
import ThemeToggle from "../../theme/themeToggle.jsx";



const DrawerLayout = ({ title, menuItems, handleLogout, isDesktop, handleDrawerToggle }) => {
  return (
    <div>
      <Toolbar>
        <Typography variant="h6" color="primary" fontWeight="bold" noWrap>
          {title}
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ overflowY: "auto",scrollbarWidth: "none",  msOverflowStyle: "none", overflow:"hidden",   
        "&::-webkit-scrollbar": {
          display: "none"            
        }, display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={!isDesktop ? handleDrawerToggle : undefined}
                sx={{
                  "&.active": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                  },

                  "&.active .MuiListItemIcon-root": {
                    color: "primary.contrastText",
                  }
                }}
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
            <ListItemButton>
              <ListItemIcon>
                <ThemeToggle />
              </ListItemIcon>
              <ListItemText primary="Theme Mode" />
            </ListItemButton>
          </ListItem>
        </List>


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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2
        }}
      >



      </Box>
    </div>
  );
};

export default DrawerLayout;
