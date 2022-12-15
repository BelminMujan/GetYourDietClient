import React from "react";

const RowHeader = (props) => {
    return (
        <div className="row-item-wrapper" style={{ gridTemplateColumns: props?.customColumns ?? `repeat(${props.numberOfItems ?? props.items.length}, 1fr)` }}>
            {props.items &&
                props.items.map((item) => {
                    return <div key={'header-'+item}>{item}</div>;
                })}
           
        </div>
    );
};
export default RowHeader;
