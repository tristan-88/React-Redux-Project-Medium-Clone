import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal"
import SignupForm from './SignupForm'
// import './SignupForm.css'
import { useDispatch, useSelector } from "react-redux";
import * as modalAction from "../../store/modal";

function SignupFormModal() {
	const dispatch = useDispatch();
    const modalLogIn = useSelector((state) => state.modalReducer.showLogin);
    const modalSignUp = useSelector((state) => state.modalReducer.showSignUp);
    const [showModal, setShowModal] = useState(false);
    const { showLogIn, showSignUp, hideLogIn, hideSignUp } = modalAction;

    useEffect(() => {
      if (modalSignUp === false) {
        setShowModal(false);
      } else if (modalSignUp === true) {
        setShowModal(true);
      }
    }, [modalSignUp]);

    const modalToggle = () => {
      setShowModal(true);
      dispatch(showSignUp());
      dispatch(hideLogIn());
    };

    const closeAll = () => {
      setShowModal(false);
      dispatch(hideSignUp());
      dispatch(hideLogIn());
    };

	return (
		<>
			<div className="sign_div" onClick={modalToggle}>
				Sign Up
			</div>
			{showModal && (
				<Modal onClose={closeAll}>
					<SignupForm />
				</Modal>
			)}
		</>
	);
}

export default SignupFormModal;