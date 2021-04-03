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

	const onClick = () => dispatch(sessionActions.demoLogin());

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<div>
				<LoginFormModal />
				<SignupFormModal />
					
					<div className="icon_div">
						<NavLink exact to="/mainpage" onClick={onClick} className="demo-btn">
							Demo Log in
						</NavLink>
					</div>
			</div>
		);
	}

	function icontext () {
		
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

				<i className="fas fa-dragon"></i>
				<input className="input-item" type="checkbox"></input>
				
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
