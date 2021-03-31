import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { showMgtCards } from "../../store/mgtcards";
import './MainPage.css'

function MainPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const mgtCardsState = useSelector(state => state.mgtcardsRdcr.cards);
    useEffect(() => {
        dispatch(showMgtCards())
    }, [])
    
    if (!sessionUser) {
      return( <Redirect to="/login" />)
    }
    
    console.log(mgtCardsState)
    
    return (
        <div>
            MainPage
     </div>
    )
}



export default MainPage;