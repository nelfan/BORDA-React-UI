import React from 'react'
import "./logo.css"

function HeaderLogo() {
    return <div className="left_side">
        <div className="logo.logoImage">
            <a href="#">
                <i className="fa fa-globe" style={{fontSize: '22px', color: 'rgba(236, 236, 236, 0.788)'}}/>
            </a>
        </div>
        <span style={{padding: "0px 0px 2px 10px", fontSize: "25px", color: "white"}}>Borda</span>
    </div>
}

export default HeaderLogo