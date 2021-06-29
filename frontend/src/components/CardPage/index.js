import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { deletingAnswer, updatingAnswer } from "../../store/answers";
import { deletingComment, updatingComment } from "../../store/comments";
import { showMgtCards, showSingleCard } from "../../store/mgtcards";
import EditAnswer from "../EditAnswer";
import Card from "../MainPage/Card";
import "./CardPage.css";
import Navigation from "../Navigation";
import * as sessionActions from "../../store/session";

function CardPage(props) {
  const id = useParams().id;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const card = useSelector((state) => state?.mgtcardsRdcr[id]);
  const comments = useSelector((state)=> state?.mgtcardsRdcr[id]?.Comments)
  const answerState = useSelector((state) => state?.answersRdcr);
  const commentState = useSelector((state) => state.commentsRdcr);
  const [showCommentEditForm, setShowCommentEditForm] = useState("");
  const [showAnswerEditForm, setShowAnswerEditForm] = useState("");
  const [editForm, setEditForm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
	//   dispatch(showMgtCards());
	  dispatch(showSingleCard(id))
  }, [answerState, comments?.length]);

  const deleteAnswer = (answerId) => {
    dispatch(deletingAnswer(answerId));
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deletingComment(commentId));
  };

  const handleShowEditCommentForm = (commentId, content) => {
    setShowCommentEditForm(`edit-comment-${commentId}`);
    setEditForm(content);
  };
  const handleShowEditAnswerForm = (answerId, answer) => {
    setShowAnswerEditForm(`edit-answer-${answerId}`);
    setEditForm(answer);
  };

  const handleCancel = () => {
    setShowCommentEditForm("");
    setShowAnswerEditForm("");
    setEditForm("");
  };

  const handleCommentEdit = (commentId) => {
    dispatch(updatingComment(commentId, editForm));
    handleCancel();
  };

  const handleAnswerEdit = (answerId) => {
    dispatch(updatingAnswer(answerId, editForm));
    handleCancel();
  };

  return (
    <>
      <div className="card-page-container">
        <div className="card_and_comments_container">
          <Navigation isLoaded={isLoaded} />
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
              <h1>Comments</h1>

              <Link exact to={`/card/${card?.id}/post/comment`}>
                <button className="button-add-forms">Add Comment</button>
              </Link>
              {card
                ? comments.map((comment, idx) => (
                    <div
                      className="comment-container"
                      key={`commend-container-${idx}`}
                    >
                      <div className="comment-div" key={comment.id}>
                        {showCommentEditForm !==
                          `edit-comment-${comment.id}` && (
                          <>
                            <p>{`User commented at: ${comment.updatedAt}`}</p>
                            <p>{comment?.content}</p>
                          </>
                        )}
                        {showCommentEditForm ===
                          `edit-comment-${comment.id}` && (
                          <>
                            <textarea
                              value={editForm}
                              onChange={(e) => {
                                setEditForm(e.target.value);
                              }}
                            />
                            <button
                              onClick={() => {
                                handleCommentEdit(comment.id);
                              }}
                              className="save-changes"
                            >
                              Save changes
                            </button>
                            <button
                              onClick={handleCancel}
                              className="cancel-edit"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        <Link
                          exact
                          to={`/card/${card.id}/comment/${comment.id}/answer`}
                        >
                          <button
                            className="button-add-forms"
                            key={`reply-${idx}`}
                          >
                            Reply
                          </button>
                        </Link>
                        {showCommentEditForm !== `edit-comment-${comment.id}` &&
                          comment.userId === sessionUser.id && (
                            <button
                              className="button-add-forms"
                              onClick={() => {
                                handleShowEditCommentForm(
                                  comment.id,
                                  comment.content
                                );
                              }}
                            >
                              Edit Comment
                            </button>
                          )}
                        {comment.userId === sessionUser.id && (
                          <button
                            className="button-add-forms"
                            key={`delete-${idx}`}
                            onClick={() => {
                              handleDeleteComment(comment.id);
                            }}
                          >
                            Delete Comment
                          </button>
                        )}
                      </div>
                      <div className="answerComments-div">
                        <h1 className="answerComments-text">
                         Replies:
                        </h1>
                        {comment.AnswerComments.length === 0 ? "There are no replies on this comment...":comment.AnswerComments.map((answer, idx) => (
                          <div
                            className="answer-container"
                            key={`answer-container-${idx}`}
                          >
                            <div className="answer-div" key={answer.id}>
                              <div className="answer-container-user">
                                <p>{`user replied at: ${answer.updatedAt}`}</p>
                              </div>
                              <p>{answer?.answer}</p>
                            </div>
                            {showAnswerEditForm !==
                              `edit-answer-${answer.id}` &&
                              answer.userId === sessionUser.id && (
                                <button
                                  className="button-add-forms"
                                  onClick={() => {
                                    handleShowEditAnswerForm(
                                      answer.id,
                                      answer.answer
                                    );
                                  }}
                                >
                                  Edit Answer
                                </button>
                              )}
                            {showAnswerEditForm ===
                              `edit-answer-${answer.id}` && (
                              <>
                                <textarea
                                  value={editForm}
                                  onChange={(e) => {
                                    setEditForm(e.target.value);
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    handleAnswerEdit(answer.id);
                                  }}
                                  className="save-changes"
                                >
                                  Save changes
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="cancel-edit"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {answer.userId === sessionUser.id && (
                              <button
                                key={`delete-answer--${idx}`}
                                className="button-add-forms"
                                onClick={() => {
                                  deleteAnswer(answer.id);
                                }}
                              >
                                Delete Reply
                              </button>
                            )}
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
    </>
  );
}

export default CardPage;
