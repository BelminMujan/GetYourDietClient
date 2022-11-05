import React from "react";

const Dropdown = (props) => {
    return (
        <div className={`dropdown-wrapper ${props?.inline ? "inline":""}`}>
            <p>{props.label}</p>
            <select>
                {props.options.map(o=>{
                    return <option value={o.value}>{o.label}</option>
                })}
            </select>
        </div>
    );
};
export default Dropdown;
