import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams} from "react-router-dom";
import { postingComment } from "../../store/comments";
import * as sessionActions from "../../store/session";
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
			<form className="comment-form" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, i) => (
						<li key={i}>{error}</li>
					))}
				</ul>
				<label className="add-form-labels">{"Comment:"}</label>
				<input
					className="input-div"
					onChange={(e) => {
						setContent(e.target.value);
					}}
				></input>
				<button className="button-add-forms" type="submit">
					Submit
				</button>
				<button className="button-add-forms" onClick={() => setContent("")}>
					Cancel
				</button>
				<button className="button-add-forms" type="reset" defaultValue="Reset">
					Reset
				</button>
			</form>
		</div>
	);
}

export default AddComment;
