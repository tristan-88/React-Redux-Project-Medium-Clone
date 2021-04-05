import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { postingAnswer } from "../../store/answers";

import "./AddAnswerPage.css";

function AddAnswer() {
	const { id, commentId } = useParams();
	const [answer, setAnswer] = useState("");
	const [errors, setErrors] = useState([]);
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		dispatch(postingAnswer(answer, commentId, user.id));
		history.goBack();
	};
	return (
		<div className="add-reply-form-div">
			<form className="reply-form-div" onSubmit={handleSubmit}>
				<label className="add-form-labels">
					{"Reply to Comment: "}
					<input
						type="text"
						className="input-div"
						onChange={(e) => {
							setAnswer(e.target.value);
						}}
					></input>
				</label>
				<button className="button-add-forms" type="reset" defaultValue="Reset">
					Reset
				</button>
				<button className="button-add-forms" type="submit">
					Submit
				</button>
				<button className="button-add-forms" onClick={() => setAnswer("")}>
					Cancel
				</button>
			</form>
		</div>
	);
}

export default AddAnswer;
