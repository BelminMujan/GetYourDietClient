import React from "react";

const OptionSelect =(props)=>{
    return <div className={`option-select-wrapper ${props.selected ? "selected":""}`} onClick={props.onClick}>{props.label}</div>
}
export default OptionSelect