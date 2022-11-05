import React from "react";
import { ClipLoader } from "react-spinners";

const Button =(props)=>{
    return <button className="button-wrapper" type="button" {...props} >{props?.loading ? <ClipLoader color="white" size={12}/> : props?.children}</button>
}
export default Button