import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useParams, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { gettingComments, updatingComment, deletingComment, postingAnswer} from "../../store/comments"
import "./EditComment.css";

function EditComment() {
    // const { id } = useParams()
    // const dispatch = useDispatch()
    // let history = useHistory();

    // const [content, setContent] = useState("")
    // const [errors, setErrors] = useState([])

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setErrors([]);

    //     dispatch(updatingComment({}))
    // }
	return (
        <div className="edit-form-div">
            <h1>Comment</h1>
			<div className="field-div">
				<input className="input-div"></input>
				<button>Submit</button>
				<button>Clear</button>
				<button>Cancel</button>
			</div>
		</div>
	);
}

export default EditComment;
