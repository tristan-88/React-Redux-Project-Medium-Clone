// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import * as modalAction from "../../store/modal";
import { useDispatch, useSelector} from "react-redux";
//import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import SignupForm from "../SignFormModal/SignupForm"
import { Modal } from "../../context/Modal";
import { NavLink } from "react-router-dom"

function LoginForm() {
	const dispatch = useDispatch();
	//const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [showModal, setShowModal] = useState(false)
    const modalLogIn = useSelector((state) => state.modalReducer.showLogin);
    const modalSignUp = useSelector((state) => state.modalReducer.showSignUp);
    const { showLogIn, showSignUp, hideLogIn, hideSignUp } = modalAction;

    useEffect(() => {
      if (modalLogIn === false) {
        setShowModal(false);
      } else if (modalLogIn === true) {
        setShowModal(true);
      }
    }, [modalLogIn]);

    const modalToggle = () => {
      setShowModal(true);
      dispatch(showLogIn());
      dispatch(hideSignUp());
    };

    const closeAll = () => {
      setShowModal(false);
      dispatch(hideLogIn());
      dispatch(hideSignUp());
    };

	//if (sessionUser) return <Redirect to="/" />;
const onClick = () => dispatch(sessionActions.demoLogin());
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
						{"Username or Email "}
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
						{"Password "}
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="log_in_sbm_btn">
					<button type="submit">Log In</button>
				</div>
				<div>Not a user? </div>
				<button className="sign-log_div" onClick={modalToggle}>
					Sign Up
				</button>
				<div className="icon_div">
					<NavLink exact to="/mainpage" onClick={onClick} className="demo-btn">
						Demo Log in
					</NavLink>
				</div>
				{showModal && (
					<Modal onClose={closeAll}>
						<SignupForm />
					</Modal>
				)}
			</form>
		</div>
	);
}

export default LoginForm;
