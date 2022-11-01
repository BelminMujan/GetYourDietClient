import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { adminPanelSidebarRoutes } from "../../Components/Constants/adminPanel";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { getUser, login } from "../../redux/userSlice";
import {useDispatch, useSelector} from "react-redux"
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";

const AdminWrapper = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user)
  
    if(!localStorage.getItem("token")){
        return <Navigate replace to="/login" />
    } else if(!user) {
        dispatch(getUser())
    }
    if(!user){
        return <div className="center-on-screen"><ClipLoader color="#1e96fc" size={64}/></div>
    }
    return (
        <div className="admin-layout-wrapper">
            <Sidebar routes={adminPanelSidebarRoutes} />
            <Outlet />
        </div>
    );
};

export default AdminWrapper;
