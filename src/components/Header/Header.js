import React from "react";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderOptions from "./HeaderOptions/HeaderOptions";
import "./entire_header.css"

function Header() {
    return <div className="alignment_of_header">
        <div className="header">
            <HeaderLogo/>
            <HeaderOptions/>
        </div>
    </div>
}

export default Header