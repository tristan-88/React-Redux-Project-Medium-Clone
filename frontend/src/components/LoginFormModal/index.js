import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import * as modalAction from '../../store/modal'

function LoginFormModal() {
	const dispatch = useDispatch()
	const modalLogIn = useSelector((state)=> state.modalReducer.showLogin)
	const modalSignUp = useSelector((state)=> state.modalReducer.showSignUp)
	const [showModal, setShowModal] = useState(false);
	const { showLogIn, showSignUp, hideLogIn, hideSignUp } = modalAction
	
	useEffect(() => {
		if (modalLogIn === false) {
			setShowModal(false)
		} else if (modalLogIn === true) {
			setShowModal(true)
		}
	},[modalLogIn])

	const modalToggle = () => {
		setShowModal(true)
		dispatch(showLogIn())
		dispatch(hideSignUp())
	}

	const closeAll = () => {
		setShowModal(false)
		dispatch(hideLogIn())
		dispatch(hideSignUp())
	}

	return (
		<>
		<div className="log_div" onClick={modalToggle}>
		Log In
		</div>
			{showModal && (
				<Modal onClose={closeAll}>
					<LoginForm />
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;
