import React from "react";
import "../../css/NavItem.css";

const NavItem = ({ link, text, onClick, newTab }) => {
    return (
        <a
            href={link}
            target={newTab ? "_blank" : "_self"}
            rel={newTab ? "noreferrer" : ""}
            onClick={onClick}
            className="nav-item"
        >
            {text}
        </a>
    );
};

export default NavItem;
