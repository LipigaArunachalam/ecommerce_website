import React, { useState } from "react";
import {
  Drawer,
  Toolbar,
  Box,
  Typography,
  AppBar,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import DrawerLayout from "./DrawerLayout";  
const drawerWidth = 260;

const CommonLayout = ({ title, menuItems, handleLogout }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid rgba(0, 0, 0, 0.12)",
            },
          }}
        >
          <DrawerLayout
            title={title}
            menuItems={menuItems}
            handleLogout={handleLogout}
            isDesktop={isDesktop}
            handleDrawerToggle={handleDrawerToggle}
          />
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
