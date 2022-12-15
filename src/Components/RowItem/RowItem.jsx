import React from "react";
import { getValueRecursively } from "../../Utils/getValueRecursively";

const RowItem = (props) => {
    return (
        <div className="row-item-wrapper" style={{ gridTemplateColumns: props?.customColumns ?? `repeat(${props.show.length + props.options.length}, 1fr)` }}>
            {props.show &&
                props.show.map((key) => {
                    return <div key={props.id + "-"+key}>{getValueRecursively(props, key) ?? 'None'}</div>;
                })}
            {props.options &&
                props.options.map((opt, i) => {
                    return <div key={props.id+"-opt-"+i}>{opt}</div>;
                })}
        </div>
    );
};
export default RowItem;
