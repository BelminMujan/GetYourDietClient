import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ routes }) => {
    return (
        <div className="sidebar-wrapper">
            {routes &&
                routes.map((r) => {
                    return (
                        <NavLink key={r.path} className={({isActive}) => "item" + (isActive ? " active" : "")} to={r.path}>
                            {r.title}
                        </NavLink>
                    );
                })}
        </div>
    );
};

export default Sidebar;
