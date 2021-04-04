import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import {
	gettingAnswers,
	updatingAnswer,
	deletingAnswer,
	postingAnswer,
} from "../../store/answers";

import "./AddAnswerPage.css";

function AddAnswer() {
	return (
		<div className="edit-form-div">
			<div className="field-div">
				<input className="input-div"></input>
				<button>Submit</button>
				<button>Clear</button>
				<button>Cancel</button>
			</div>
		</div>
	);
}

export default AddAnswer;
