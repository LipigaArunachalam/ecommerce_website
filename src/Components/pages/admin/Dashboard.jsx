import { Drawer } from "@mui/material";

const AdminDashboard = () => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <Drawer variant="permanent" anchor="left">
                <ul>
                    <li>Products</li>
                    <li>Customers</li>
                    <li>Sellers</li>
                    <li>Orders</li>
                </ul>
            </Drawer>
        </div>
    );
}

export default AdminDashboard;