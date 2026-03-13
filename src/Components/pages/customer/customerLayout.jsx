import React from "react";
import useLogout from "../auth/Logout";
import { Dashboard,Storefront,ShoppingCart ,GridView} from "@mui/icons-material";
import CommonLayout from "../../layouts/CommonLayout";

const CustomerLayout = () => {
    const menuItems = [
        { text: "Dashboard", icon: <Dashboard />, path: "/customer-profile" },
        { text: "Cart", icon: <ShoppingCart />, path: "/cart" },
        { text: "Orders", icon: <Storefront />, path: "/orders" },
        { text: "Products", icon: <GridView/>, path: "/catalog"},
    ];


    const { handleLogout } = useLogout();


    return (
        <CommonLayout
            title="Customer Panel"
            menuItems={menuItems}
            handleLogout={handleLogout}
        />

    );
}

export default CustomerLayout;
