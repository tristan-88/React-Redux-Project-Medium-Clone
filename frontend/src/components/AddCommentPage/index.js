import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link , useHistory, useParams} from "react-router-dom";
import * as sessionActions from "../../store/session";
import {
	gettingComments,
	updatingComment,
	deletingComment,
	postingComment,
} from "../../store/comments";
import "./AddCommentPage.css";

function AddComment() {
    const { id } = useParams()
    const cardId = id
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
     const user= useSelector((state) => state.session.user);
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(postingComment(content, cardId , user.id))
        history.goBack()
    }

    

	return (
		<div className="add-comment-form-div">
            <form className='comment-form' onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, i) => (<li key={i}>{error}</li>))}
                </ul>
				<input className="input-div" onChange={(e)=>{setContent(e.target.value)}}></input>
				<button type="submit">Submit</button>
				<div onClick={()=> setContent('')}>Clear</div>
				<div onClick={()=> history.goBack()}>Cancel</div>
             </form>
		</div>
	);
}

export default AddComment;
