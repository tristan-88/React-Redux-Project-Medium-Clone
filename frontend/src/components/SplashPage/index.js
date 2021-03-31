import React, { useEffect, useState} from "react"
import "./SplashPage.css"
import Navigation from '../Navigation'
import { useDispatch } from "react-redux";

function SplashPage() {
    
    return (
        <>
        <div className="splash-body">
            <div className="h1-container">
                <h1 className="h1-splash">WELCOME TO MGT-CARDS CHANNEL</h1>
            </div>
            </div>
        </>
    )
}

export default SplashPage;