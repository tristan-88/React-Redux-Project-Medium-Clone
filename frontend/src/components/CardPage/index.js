import React, {useEffect, } from "react"
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import { showMgtCards } from "../../store/mgtcards";
import Card from "../MainPage/Card"
import './CardPage.css'

function CardPage(props) {
    const id = useParams().id;
    console.log(id)
    const dispatch = useDispatch()
    const card = useSelector((state) => state?.mgtcardsRdcr[id]);
    console.log(card)
            useEffect(() => {
				dispatch(showMgtCards());
            }, []);
    return (
     
        <div className="card-container">
            <div className="card_name-div">
            {card ? card.cardName:null}    
            </div>
            <div className="card_img-div">
                {card ? <img src={`${card.cardImg}`} className="card_img-div"/>:null}
            </div>
            
            <div className="comments_and_answer-div">
                <button className="add_comment_btn">Add Comment</button>
                {card ? card.Comments.map(comment => (
                    <div className="comment-container">
                <div className="comment-div" key={comment.id}>{comment?.content}               
                            <button>Delete Comment</button>
                            <button>Reply to Comment</button>
                        </div>
                        <div className="answerComments-div">{comment.AnswerComments.map(answer => (
                            <div className="answer-container">
                                <div className="answer-div" key={answer.id}>{answer?.answer}</div>
                                <button>Delete Answer</button>
                                </div>
                        ))}</div>
                        </div>
                )) : null}
            </div>
            </div>
            
		);

}

export default CardPage;