import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from '../../store/session'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignFormModal'
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	 const history = useHistory();

		const routeChange = () => {
			let path = `/mainpage`;
			history.push(path);
		};

	const logout = (e) => {
		e.preventDefault();
		try {
			dispatch(sessionActions.logout());
			history.push("/");
		} catch (e) {
			alert(e.message);
		}
	};

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<>
			<ProfileButton user={sessionUser} />
		
							<div className="user-logout-btn" onClick={logout}>Log Out</div>
				
			</>
		);
	} else {
		sessionLinks = (
			<div className="session-links">
				<div>
					<LoginFormModal />
				</div>
				<div>
					<SignupFormModal />
				</div>

			
			</div>
		);
	}


	return (
		
		<nav role="navigation" className="nav-bar">
			{/* <div id="menuToggle" className="icon_div">

				<i className="fas fa-dragon"></i>
				<input className="input-item" type="checkbox"></input> */}

			{/* <ul id="menu"> */}
				<div className="session-links">
				<NavLink exact to="/" style={{ textDecoration: "none" }}>
					<div id="menu">Home</div>
				</NavLink>
				</div>
			{isLoaded &&
				sessionLinks}
			{/* </ul> */}

			{/* </div> */}
		</nav>
	);
}

export default Navigation;
