import React from "react";
import { NavLink } from "react-router-dom";

const Navbar=()=>{
    return <div className="navbar-wrapper">
        <img src="" alt="GetYourDiet"/>
        <NavLink to="/login">Login</NavLink>
    </div>
}

export default Navbar