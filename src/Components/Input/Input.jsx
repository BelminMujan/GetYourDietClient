import React from "react";

const Input =(props)=>{
    return <label className={`input-field-wrapper ${props.className} ${props.error ? "error":""} ${props?.inline ?"inline":""}`}>
        {props.label}
        <input {...props}/>
        {props.error && props.error.map((e,i)=>{
            return <p className="error-message" key={"input-error-"+i}>{e}</p>
        })}
    </label>
}
export default Input
