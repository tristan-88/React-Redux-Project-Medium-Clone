import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import {
	gettingComments,
	updatingComment,
	deletingComment,
	postingAnswer,
} from "../../store/comments";
import "./AddCommentPage.css";

function AddComment() {
	return (
		<div className="add-form-div">
			<div className="field-div">
				<input className="input-div"></input>
				<button>Submit</button>
				<button>Clear</button>
				<button>Cancel</button>
			</div>
		</div>
	);
}

export default AddComment;
