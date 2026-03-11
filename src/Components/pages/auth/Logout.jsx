import React from "react";
import { useLogoutMutation } from "../../../services/rtkQuery/authApi";
import { useNavigate } from "react-router-dom";

const Logout=()=>{
    const [login] = useLogoutMutation();
    const navigate = useNavigate();
    const handleLogout = async()=>{
        try{
            console.log("logout is hitted")
           await login(localStorage.getItem("user_id")).unwrap();
           localStorage.clear();
           navigate("/");
        }catch(err){
           console.error(err);
        }
    }
    
    return {handleLogout}
   
}

export default Logout;