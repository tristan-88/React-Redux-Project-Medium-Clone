import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from '../../store/session'
import LoginFormModal from '../LoginFormModal'
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onClick = () => dispatch(sessionActions.demoLogin());

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<div>
				<LoginFormModal />
					<div className="icon_div">
						<NavLink to="/signup" className="signup-btn">
							{" Sign Up "}
						</NavLink>
					</div>
					<div className="icon_div">
						<NavLink to="/" onClick={onClick} className="demo-btn">
							Demo Log in
						</NavLink>
					</div>
			</div>
		);
	}

	return (
		// <div className="nav-link-container">
		// 	<div className="nav-link_div">
		// 		<button className="home-btn">
		// 				<div className="icon_div">
		// 					<i className="fas fa-dragon" />
		// 					<NavLink exact to="/" style={{textDecoration: 'none'}}>
		// 				{" Home "}
		// 					</NavLink>
		// 				</div>
		// 		</button>
		// 		<div className='log-sign-demo-btn'>
		// 			{isLoaded && sessionLinks}
		// 		</div>
		// 	</div>
		// </div>

		<nav role="navigation">
			<div id="menuToggle" className="icon_div">
				<i className="fas fa-dragon" />
				<input type="checkbox"></input>

				<ul id="menu">
					<NavLink exact to="/" style={{ textDecoration: "none" }}>
						Home
					</NavLink>
					{isLoaded && sessionLinks}
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;
