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
                    <h1 className="h1-splash">WELCOME TO MTG-CARDS CHANNEL</h1>
                    <div>The Remote Gathering for all the "Magic The Gathering" card players come to socialize and mingle.</div>
                </div>
              
            </div>
        </>
    )
}

export default SplashPage;