import React, { useState } from "react";
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
  Typography,
  AppBar,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon, Logout } from "@mui/icons-material";
import { Outlet, NavLink } from "react-router-dom";

const drawerWidth = 260;

const CommonLayout = ({ title, menuItems, handleLogout }) => {
  const theme = useTheme();
  // Drawer is permanent on 'md' and up (>=900px by default in MUI)
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
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

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar for mobile view */}
      {!isDesktop && (
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="primary" fontWeight="bold" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar Navigation */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant={isDesktop ? "permanent" : "temporary"}
          open={isDesktop ? true : mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid rgba(0, 0, 0, 0.12)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          // Adjust top margin for mobile AppBar
          mt: { xs: 8, md: 0 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default CommonLayout;
