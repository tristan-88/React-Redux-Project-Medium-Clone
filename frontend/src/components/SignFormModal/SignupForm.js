import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import LoginForm from "../LoginFormModal/LoginForm";
import { Modal } from "../../context/Modal";
import * as modalAction from "../../store/modal";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalLogIn = useSelector((state) => state.modalReducer.showLogIn);
  const modalSignUp = useSelector((state) => state.modalReducer.showSignUp);
  const { showLogIn, showSignUp, hideLogIn, hideSignUp } = modalAction;

  // useEffect(() => {
  //   if (modalSignUp === false) {
  //     setShowModal(false);
  //   } else if (modalSignUp === true) {
  //     setShowModal(true);
  //   }
  // }, [modalSignUp]);
	
  if (sessionUser) return <Redirect to="/mainpage" />;

  const modalToggle = () => {
    // setShowModal(true);
    dispatch(showLogIn());
    dispatch(hideSignUp());
  };

  const closeAll = () => {
    // setShowModal(false);
    dispatch(hideSignUp());
    // dispatch(hideLogIn());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(hideSignUp())
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };
  return (
    <div className="sign_up_form_container">
      <h2 className="sign_up_header">Sign-Up Form</h2>
      <form onSubmit={handleSubmit}>
        <ul className="error-message">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            className="email_text"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
        <div>Already a user? </div>
      
        {/* {modalLogIn && (
          <Modal onClose={closeAll}>
            <LoginForm />
          </Modal>
        )} */}
      </form>
      <button className="sign-log_div" onClick={modalToggle}>
          Log In
        </button>
    </div>
  );
}

export default SignupForm;
