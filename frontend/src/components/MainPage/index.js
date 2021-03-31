import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { showMgtCards } from "../../store/mgtcards";
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
					{mgtCardsState?.map((card) => (
						<div className="card-div" key={card.id}>
							{card.cardName}
							<img
								src={`${card.cardImg}`}
								alt="/Users/tristansanjuan/Desktop/AppAcademy/Project-solo-react/authenticate-me/frontend/src/project-items/Image.jpeg"
							/>
						</div>
					))}
				</div>
			</div>
		);
}



export default MainPage;