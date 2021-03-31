import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { showMgtCards } from "../../store/mgtcards";
import Card from "./Card"
import './MainPage.css'

function MainPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const mgtCardsState = useSelector(state => state?.mgtcardsRdcr?.cards);
    useEffect(() => {
        dispatch(showMgtCards())
    }, [])
    //Logout re-direct
    if (!sessionUser) {
      return (<Redirect to="/" />)
    } 
   
    
    
    console.log(mgtCardsState)
    
    return (
			<div className="main-page-div">
				<div className="cards-container">
          {mgtCardsState?.map((card) => <Card card={card} key={card.id} />)}
				</div>
			</div>
		);
}



export default MainPage;