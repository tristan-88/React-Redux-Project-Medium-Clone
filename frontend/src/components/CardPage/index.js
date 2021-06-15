import React, { useEffect, } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { deletingAnswer } from "../../store/answers";
import { deletingComment } from "../../store/comments";
import { showMgtCards } from "../../store/mgtcards";
import EditAnswer from '../EditAnswer'
import Card from "../MainPage/Card"
import './CardPage.css'

function CardPage(props) {
	const id = useParams().id;
	const dispatch = useDispatch()
	const card = useSelector((state) => state?.mgtcardsRdcr[id]);
	const answerState = useSelector((state) => state?.answersRdcr);
	const commentState = useSelector((state) => state.commentsRdcr);

	useEffect(() => {
		dispatch(showMgtCards());
	}, [answerState, commentState]);

	const deleteAnswer = (answerId) => {
		dispatch(deletingAnswer(answerId))
	}

	const handleDeleteComment = (commentId) => {
		dispatch(deletingComment(commentId));
	};

	return (
		<div className="card-page-container">
			<div className="card_and_comments_container">
				<div className="card-container">
					<div className="scene">
						<div className="card">
							<div className="card__face card__face--front">
								<div className="card_img-div">
									{card ? (
										<img src={`${card.cardImg}`} className="card_img-div" />
									) : null}
								</div>
							</div>
							<div className="card__face card__face--back">
								<div className="card_name-div">
									Name: {card ? card.cardName : null}
								</div>
								<div className="card_set-div">
									Set: {card ? card.cardSet : null}
								</div>
								<div className="card_type-div">
									Type: {card ? card.cardType : null}
								</div>
								<div className="card_manacost-div">
									Mana Cost: {card ? card.cardManaCost : null}
								</div>
								<div className="card_colors-div">
									Color: {card ? card.cardColors : null}
								</div>
								<div className="card_text-div">
									Card Text: {card ? card.cardText : null}
								</div>
							</div>
						</div>
					</div>

					<div className="comments_and_answer-div">
						<Link exact to={`/card/${card?.id}/post/comment`}>
							<button className="button-add-forms">Add Comment</button>
						</Link>
						{card
							? card.Comments.map((comment, idx) => (
								<div className="comment-container" key={`commend-container-${idx}`}>
									<div className="comment-div" key={comment.id}>
										{comment?.content}
										{/* <Link exact to={`/comment/${comment.id}`}>
											<button className="edit_comment_btn">Edit Comment</button>
										</Link> */}
										<Link
											exact
											to={`/card/${card.id}/comment/${comment.id}/answer`}
										>
											<button className="button-add-forms" key={`reply-${idx}`}>Reply</button>
										</Link>
										<button
											className="button-add-forms"
											key={`delete-${idx}`}
											onClick={() => { handleDeleteComment(comment.id) }}
										>
											Delete Comment
										</button>
									</div>
									<div className="answerComments-div">
										<p className="answerComments-text">Replies:</p>
										{comment.AnswerComments.map((answer, idx) => (
											<div className="answer-container" key={`answer-container-${idx}`}>
												<div className="answer-div" key={answer.id}>
													{answer?.answer}
												</div>
												{/* <Link
													exact
													to={`/card/${answer.id}/answer/${answer.id}`}
													>
													<button className="edit_answer_btn">
														Edit Reply
													</button>
												</Link> */}
												<button
													key={`delete-answer--${idx}`}
													className="button-add-forms"
													onClick={() => {
														deleteAnswer(answer.id);
													}}
												>
													Delete Reply
												</button>
											</div>
										))}
									</div>
								</div>
							))
							: null}
					</div>
				</div>
			</div>
		</div>
	);

}

export default CardPage;
