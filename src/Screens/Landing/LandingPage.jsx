import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Navbar from "../../Components/Navbar/Navbar";

const LandingPage=()=>{
    const navigate = useNavigate()
    return <div className="landing-page-wrapper">
        <Navbar />
        <div className="header">
            <Button onClick={()=>navigate("/get-diet")}>Get started</Button>
        </div>
    </div>
}
export default LandingPage