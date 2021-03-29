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
				<button>
					<div className="icon_div">
						<i className="fas fa-dragon" />
						<NavLink to="/signup" className="signup-btn">
							Sign Up
						</NavLink>
					</div>
				</button>
				<button>
					<div className="icon_div">
						<i className="fas fa-dragon" />
						<NavLink to="/" onClick={onClick} className="demo-btn">
							Demo Login
						</NavLink>
					</div>
				</button>
			</div>
		);
	}

    return (
			<div className="nav-link_div">
				<button>
						<div className="icon_div">
							<i className="fas fa-dragon" />
							<NavLink exact to="/">
								Home
							</NavLink>
						</div>
				</button>
					{isLoaded && sessionLinks}
			</div>
		);
}

export default Navigation;
