import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import "./SplashPage.css"
import Navigation from '../Navigation'
import { useDispatch } from "react-redux";

function SplashPage() {
    const session = useSelector((state) => state.session.user);
    
    
    
    return (
        <>
            {session ? <Redirect exact to="/mainpage" /> : null}
        <div className="splash-body">
            <div className="h1-container">
                <h1 className="h1-splash">WELCOME TO MGT-CARDS CHANNEL</h1>
            </div>
            </div>
        </>
    )
}

export default SplashPage;