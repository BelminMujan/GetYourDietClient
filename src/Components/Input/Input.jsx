import React from "react";

const Input =(props)=>{
    return <label className={`input-field-wrapper ${props.error ? "error":""}`}>
        {props.label}
        <input {...props}/>
        {props.error && props.error.map((e,i)=>{
            return <p className="error-message" key={"login-error-"+i}>{e}</p>
        })}
    </label>
}
export default Input