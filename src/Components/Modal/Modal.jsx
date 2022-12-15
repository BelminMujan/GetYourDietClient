import React from "react";

const Modal = ({ children, close }) => {
    return <div className="modal-wrapper">
        <div className="backdrop"></div>
        <div className="content">
            <div className="close" onClick={close}>x</div>
            {children}
        </div>
    </div>
}
export default Modal