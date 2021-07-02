// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import * as modalAction from "../../store/modal";
import { useDispatch, useSelector } from "react-redux";
//import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import SignupForm from "../SignFormModal/SignupForm";
import { Modal } from "../../context/Modal";
import { NavLink } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  //const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const modalLogIn = useSelector((state) => state.modalReducer.showLogIn);
  const modalSignUp = useSelector((state) => state.modalReducer.showSignUp);
  const { showLogIn, showSignUp, hideLogIn, hideSignUp } = modalAction;

  // useEffect(() => {
  //   if (modalLogIn === false) {
  //     setShowLogInModal(false);
  //   } else if (modalLogIn === true) {
  //     setShowLogInModal(true);
  //   }
  // }, [modalLogIn]);

  const modalToggle = () => {
    //   setShowLogInModal(true);
    dispatch(showSignUp());
    dispatch(hideLogIn());
  };

  const closeAll = () => {
    //   setShowLogInModal(false);
    dispatch(hideLogIn());
    //   dispatch(hideSignUp());
  };

  //if (sessionUser) return <Redirect to="/" />;
  const onClick = () => {
    dispatch(hideLogIn());
    dispatch(sessionActions.demoLogin());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(hideLogIn());
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

        <div className="icon_div">
          <NavLink exact to="/mainpage" onClick={onClick} className="demo-btn">
            Demo Log in
          </NavLink>
        </div>
        {/* {modalSignUp && (
					<Modal onClose={closeAll}>
						<SignupForm />
					</Modal>
				)} */}
      </form>
      <button className="sign-log_div" onClick={modalToggle}>
        Sign Up
      </button>
    </div>
  );
}

export default LoginForm;
