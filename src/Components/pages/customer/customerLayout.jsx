import React from "react";
import useLogout from "../auth/Logout";
import { Dashboard,Storefront,ShoppingCart ,GridView} from "@mui/icons-material";
import CommonLayout from "../../layouts/CommonLayout";

const CustomerLayout = () => {
    const menuItems = [
        { text: "Dashboard", icon: <Dashboard />, path: "/customer/customer-profile" },
        { text: "Cart", icon: <ShoppingCart />, path: "/customer/cart" },
        { text: "Orders", icon: <Storefront />, path: "/customer/orders" },
        { text: "Products", icon: <GridView/>, path: "/customer/catalog"},
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