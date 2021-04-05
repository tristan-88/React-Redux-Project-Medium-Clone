import React, {useEffect, } from "react"
import { useDispatch, useSelector } from "react-redux";
import {useParams, Link} from "react-router-dom"
import { deletingAnswer } from "../../store/answers";
import { showMgtCards } from "../../store/mgtcards";
import EditAnswer from '../EditAnswer'
import Card from "../MainPage/Card"
import './CardPage.css'

function CardPage(props) {
    const id = useParams().id;
    console.log(id)
    const dispatch = useDispatch()
    const card = useSelector((state) => state?.mgtcardsRdcr[id]);
    const answerState = useSelector((state)=> state?.answersRdcr)
    console.log(card)
            useEffect(() => {
                dispatch(showMgtCards());
            }, [answerState]);
    const deleteAnswer = (answerId) => {
        dispatch(deletingAnswer(answerId))
    }
    return (
			<div className="card-container">
				<div className="card_name-div">{card ? card.cardName : null}</div>
				<div className="card_img-div">
					{card ? (
						<img src={`${card.cardImg}`} className="card_img-div" />
					) : null}
				</div>

				<div className="comments_and_answer-div">
                <Link exact to={`/card/${card?.id}/post/comment`}>
						<button className="post_comment_btn">Add Comment</button>
					</Link>
					{card
						? card.Comments.map((comment) => (
								<div className="comment-container">
									<div className="comment-div" key={comment.id}>
										{comment?.content}
										<Link exact to={`/comment/${comment.id}`}>
											<button className="edit_comment_btn">Edit Comment</button>
										</Link>
										<Link exact to={`/card/${card.id}/comment/${comment.id}/answer`}>
											<button className="add_reply_to_comment_btn">
												Reply
											</button>
										</Link>
										<button>Delete Comment</button>
									</div>
									<div className="answerComments-div">
										{comment.AnswerComments.map((answer) => (
											<div className="answer-container">
												<div className="answer-div" key={answer.id}>
													{answer?.answer}
												</div>
												<Link exact to={`/card/${answer.id}/answer/${answer.id}`}>
													<button className="edit_answer_btn">
														Edit Reply
													</button>
												</Link>
												<button
													onClick={() => {
														deleteAnswer(answer.id);
													}}
												>
													Delete Answer
												</button>
											</div>
										))}
									</div>
								</div>
						  ))
						: null}
				</div>
			</div>
		);

}

export default CardPage;