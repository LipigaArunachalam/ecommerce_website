import useLogout from "../auth/Logout";
import CommonLayout from "../../layouts/CommonLayout";
import { Catalog } from '@mui/icons-material';


const customerLayout = () => {

    const menuItems = [
        {text: catalog, icon: <Catalog />, path: '/catalog'},
        {text: profile, icon: <Profile />, path: '/profile'},
        {text: Order, icon: <Order />, path: '/order'},
    ]

    const {handleLogout} = useLogout(); 
    return (
        <>
        </>
    )
}