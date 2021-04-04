import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { showMgtCards } from "../../store/mgtcards";
import Card from "./Card"
import './MainPage.css'

function MainPage() {
    //reducers
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const mgtCardsState = useSelector(state => state?.mgtcardsRdcr) || {};
  
  //grabbing the values from the object to an array
  const cards = Object.values(mgtCardsState);
  console.log(cards);
  console.log(mgtCardsState);

  //fetch call from api
  useEffect(() => {
    dispatch(showMgtCards());
  }, []);
  //Logout re-direct
  
  
  return (
    <div className="main-page-div">
     
      {sessionUser && <div className="cards-container">
        {cards.map((card) => <Card card={card} key={card.id} />)}
      </div>}
      {sessionUser ? null : <Redirect exact to="/" />}
    </div>
    )
}
    



export default MainPage;