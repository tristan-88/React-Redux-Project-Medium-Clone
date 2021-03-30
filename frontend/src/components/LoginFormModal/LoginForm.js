// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch} from "react-redux";
//import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
	const dispatch = useDispatch();
	//const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	//if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			}
		);
	};

	return (
		<section className="log_in_form">
			<div className="log_in_container">

			<h2 className="log_in_h2">Log In</h2>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
						))}
						
				</ul>
					<div>
				<label>
					{'Username or Email '}
					<input
						type="text"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
						/>
				</label>
				</div>
				<div>

				<label>
					{'Password '}
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						/>
					</label>
					<div className="log_in_sbm_btn">

				<button type="submit">Log In</button>
					</div>
					</div>
			</form>
		</div>
		</section>
	);
}

export default LoginForm;
