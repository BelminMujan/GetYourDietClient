import React from "react";

const Dropdown = (props) => {
    return (
        <div className={`dropdown-wrapper ${props?.inline ? "inline":""}`}>
            <p>{props.label}</p>
            <select value={props.value} onChange={(e)=>props?.onChange(e.target.value)}>
                {props.options.map(o=>{
                    return <option key={'dropdown-option-'+props.label+'-'+o.value} value={o.value} >{o.label}</option>
                })}
            </select>
        </div>
    );
};
export default Dropdown;
