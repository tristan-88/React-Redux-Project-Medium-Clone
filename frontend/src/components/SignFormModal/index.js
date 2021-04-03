import React, { useState } from "react";
import { Modal } from "../../context/Modal"
import SignupForm from './SignupForm'
import './SignupForm.css'

function SignupFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className="sign_div" onClick={() => setShowModal(true)}>
				Sign Up
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<SignupForm />
				</Modal>
			)}
		</>
	);
}

export default SignupFormModal;