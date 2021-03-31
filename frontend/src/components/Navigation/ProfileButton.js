import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './Navigation.css'

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		
	};

	return (
		<div className="show-menu-container">
			<button onClick={openMenu}>
				<div className="user-btn_div">{`User:${user.username}`}</div>
			</button>
			{showMenu && (
				<div>
					<div>
						<div className="user-name-div">User:{user.username}</div>
						<div className="user-email-div">Email:{user.email}</div>
						<div>
							<button onClick={logout}>Log Out</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProfileButton;
