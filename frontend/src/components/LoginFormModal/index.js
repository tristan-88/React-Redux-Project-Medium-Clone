import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import * as modalAction from '../../store/modal'

function LoginFormModal() {
	const dispatch = useDispatch()
	const modalLogIn = useSelector((state)=> state.modalReducer.showLogIn)
	const modalSignUp = useSelector((state)=> state.modalReducer.showSignUp)
	const [showLogInModal, setShowLogInModal] = useState(false);
	const { showLogIn, showSignUp, hideLogIn, hideSignUp } = modalAction
	
	// useEffect(() => {
	// 	if (modalLogIn === false) {
	// 		showLogInModal(false)
	// 	} else if (modalLogIn === true) {
	// 		showLogIn(true)
	// 	}
	// },[modalLogIn])

	const modalToggle = () => {
		// setShowLogInModal(true)
		dispatch(showLogIn())
		dispatch(hideSignUp())
	}

	const closeAll = () => {
		// setShowLogInModal(false)
		dispatch(hideLogIn())
		// dispatch(hideSignUp())
	}

	return (
		<>
		<div className="log_div" onClick={modalToggle}>
		Log In
		</div>
			{modalLogIn && (
				<Modal onClose={closeAll}>
					<LoginForm />
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;
